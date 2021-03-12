"use strict";

const { Student, validateStudent } = require("../models/student");
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
const getAll = async () => await Student.find().sort("registration");

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
const getByRegistration = async (registration) => {
  let student = MongoDb.getByRegistration(registration);
  student.selections = await Promise.all(
    student.selections.map(
      async (selectionId) => await SelectionController.getByIds(selectionId)
    )
  );
  return student;
};

/**
 * Get student by email
 * @param {string} email
 * @returns {object} student
 */
const getByEmail = async (email) => MongoDb.getByEmail(email);

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
  { name, email, cra, description, skills, experiences }
) =>
  await MongoDb.updateByRegistration(Student, registration, {
    name,
    email,
    cra,
    description,
    skills,
    experiences,
  });

/**
 * Remove student by registration
 * @param {string} registration
 * @returns {object} student removed
 */
const remove = async (registration) =>
  await Student.findOneAndDelete({ registration });

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
  getByRegistrations,
  create,
  update,
  remove,
  validate,
};
