"use strict";

const {
  Student,
  validateStudent,
  getStudentWithSelections,
} = require("../models/student");
const { filterProps } = require("../middlewares/util");

/**
 * Get all students
 * @returns {array} list of all students
 */
const getAll = () => Student.find().sort("registration");

/**
 * Get student by registration
 * @param {number} registration
 * @returns {object}
 */
const getByRegistration = async (registration) =>
  await Student.findOne(registration);

/**
 * Get student by registration with selections
 * @param {number} registration
 * @returns {object} student with selections
 */
const getByRegistrationWithSelections = async (registration) => {
  const student = await Student.findOne({ registration: registration });
  if (student && student.error === undefined)
    return getStudentWithSelections(student);
  throw "The student with the given ID was not found.";
};

/**
 * Create student
 * @param {number} registration
 * @param {string} name
 * @param {string} email
 * @param {number} cra
 * @param {string} description
 * @param {array} skills
 * @param {array} experiences
 * @returns {object} student created
 */
const create = async ({
  registration,
  name,
  email,
  cra,
  description,
  skills,
  experiences,
}) => {
  const student = new Student({
    registration: registration,
    name: name,
    email: email,
    cra: cra,
    description: description,
    skills: skills,
    experiences: experiences,
  });
  return await student.save();
};

/**
 * Update student
 * @param {number} registration
 * @param {object} updateData, student to update
 * @param {number} updatePhase, phase to update
 * @returns {object} student updated
 */
const update = async (registration, updateData, updatePhase) => {
  let propsToUpdate = [
    "name",
    "email",
    "cra",
    "description",
    "skills",
    "experiences",
  ];
  if (updatePhase) propsToUpdate.push("phases");
  return await Student.findOneAndUpdate(
    { registration: registration },
    {
      registration: registration,
      ...filterProps(
        updateData,
        propsToUpdate,
        (key, value) =>
          (key !== "registration" && value) ||
          (key === "description" && value === "")
      ),
    },
    {
      new: true,
    }
  );
};

/**
 * Remove student by registration
 * @param {string} registration
 * @returns {object} student removed
 */
const remove = async (registration) =>
  await Student.findOneAndDelete(registration);

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
  getByRegistration,
  create,
  update,
  remove,
  validate,
  getByRegistrationWithSelections,
};
