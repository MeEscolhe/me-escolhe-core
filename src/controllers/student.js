"use strict";

const { Student, validateStudent } = require("../models/student");
const {
  defaultArray,
  defaultSkills,
  defaultExperiences,
} = require("../middlewares/default-values-provider");
const PhaseController = require("../controllers/phase");
const SelectionController = require("../controllers/selection");
const { filterProps } = require("../middlewares/util");

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
  await Student.find({ registration: { $in: registrations } }).sort(
    "registration"
  );

/**
 * Get student by registration with selections
 * @param {number} registration
 * @returns {object} student with selections
 */
const getByRegistration = async (registration) => {
  let student = await Student.findOne({ registration });
  let selectionIds = (await PhaseController.getByIds(student.phases)).map(
    (phase) => phase.selectionId
  );
  const selections = await SelectionController.getByIds(selectionIds);
  student.selections = selections;
  return student;
};

/**
 * Get student by email
 * @param {string} email
 * @returns {object} student
 */
const getByEmail = async (email) => await Student.findOne({ email });

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
  description,
  skills = defaultSkills,
  phases = defaultArray,
  experiences = defaultExperiences,
}) => {
  const student = new Student({
    registration,
    name,
    email,
    cra,
    description,
    skills,
    phases,
    experiences,
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
    { registration },
    {
      registration,
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
