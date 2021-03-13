"use strict";

const { Student, validateStudent } = require("../models/student");
const { Credential } = require("../models/credential");
const { Selection } = require("../models/selection");
const {
  DefaultString,
  DefaultArray,
  DefaultSkills,
  DefaultExperiences,
} = require("../providers/default-values-provider");
const SelectionController = require("../controllers/selection");
const MongoDb = require("../middlewares/mongodb-middleware");

/**
 * Get all students
 * @returns {array} list of all students
 */
const getAll = async () => await MongoDb.getAll(Student, "registration");

/**
 * Get students by list of registrations
 * @returns {array} list of registrations
 */
const getByRegistrations = async (registrations) =>
  registrations.map(
    async (registration) => await getByRegistration(registration)
  );

/**
 * Get student by registration with selections
 * @param {number} registration
 * @returns {object} student with selections
 */
const getByRegistrationWithSelections = async (registration) => {
  let student = await getByRegistration(registration);
  if (!student) return student;
  student.selections = await Promise.all(
    student.selections.map(
      async (selectionId) => await SelectionController.getByIds(selectionId)
    )
  );
  return student;
};

/**
 * Get student by registration
 * @param {number} registration
 * @returns {object} student
 */
const getByRegistration = async (registration) =>
  await MongoDb.getByRegistration(Student, registration);

/**
 * Get student by email
 * @param {string} email
 * @returns {object} student
 */
const getByEmail = async (email) => MongoDb.getByEmail(Student, email);

/**
 * Create student
 * @param {number} registration
 * @param {string} name
 * @param {string} email
 * @param {number} cra
 * @param {string} description
 * @param {object} skills
 * @param {object} experiences
 * @returns {object} student created
 */
const create = async ({
  registration,
  name,
  email,
  cra,
  description = DefaultString,
  skills = DefaultSkills,
  phases = DefaultArray,
  experiences = DefaultExperiences,
}) =>
  await MongoDb.create(Student, {
    registration,
    name,
    email,
    cra,
    description,
    skills,
    phases,
    experiences,
  });

/**
 * Update student
 * @param {number} registration
 * @param {object} updateData, student to update
 * @returns {object} student updated
 */
const update = async (
  registration,
  { name, email, password, cra, description, skills, experiences }
) => {
  const oldStudent = await MongoDb.getByRegistration(Credential, registration);
  const newStudent = await MongoDb.updateByRegistration(Student, registration, {
    name,
    email,
    cra,
    description,
    skills,
    experiences,
  });
  await MongoDb.updateByEmail(Credential, oldStudent.email, {
    email,
    password,
  });
  return newStudent;
};

/**
 * Remove student by registration
 * @param {string} registration
 * @returns {object} student removed
 */
const remove = async (registration) => {
  const student = await MongoDb.getByRegistration(Student, registration);
  if (!student) return student;
  await MongoDb.removeByRegistration(Student, registration);
  await MongoDb.removeByEmail(Credential, student.email);
  await MongoDb.removeOfArrays(Selection, "students", registration);
  return student;
};

/**
 * Validate student
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateStudent(object);
  return error;
};

module.exports = {
  getAll,
  getByEmail,
  getByRegistration,
  getByRegistrationWithSelections,
  getByRegistrations,
  create,
  update,
  remove,
  validate,
};
