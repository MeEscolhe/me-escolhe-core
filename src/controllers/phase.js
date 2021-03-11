"use strict";

const { Phase, validatePhase } = require("../models/phase");
const { Student } = require("../models/student");
const MongoDb = require("../middlewares/mongodb-middleware");
const {
  DefaultObject,
  DefaultArray,
  DefaultString,
} = require("../providers/default-values-provider");
const { ObjectId } = require("../providers/types-provider");
const phase = require("../models/phase");

/**
 * Get all phases
 * @returns {array} list of all phases
 */
const getAll = async () =>
  await Promise.all(
    (await MongoDb.getAll(Phase, "name")).map(async (phase) => {
      phase.students = await MongoDb.getByRegistrations(
        Student,
        phase.students
      );
      return phase;
    })
  );

/**
 * Get phase by id
 * @param {string} id
 * @returns {object} phase
 */
const getById = async (id) => {
  let phase = await MongoDb.getById(Phase, id);
  if (phase)
    phase.students = await MongoDb.getByRegistrations(Student, phase.students);
  return phase;
};

/**
 * Get phase by list of ids
 * @param {array} ids
 * @returns {array} list of phases
 */
const getByIds = async (ids) => {
  let phases = await Phase.find({ _id: { $in: ids } });
  phases = phases.map(async (phase) => {
    let students = await StudentController.getByRegistrations(phase.students);
    phase.students = students;
    return phase;
  });
  return phases;
};

/**
 *
 * @param {Student} student
 */
const getStudentsPhase = async (student) =>
  await Phase.find().where("_id").in(student.phases);
/**
 * Create phase
 * @param {array} students
 * @param {string} selectionId
 * @param {string} description
 * @returns {object} phase created
 */
const create = async ({
  students = DefaultArray,
  selectionId,
  description = DefaultString,
}) =>
  await MongoDb.create(Phase, {
    students,
    selectionId,
    description,
  });

/**
 * Add student to phase
 * @param {string} phaseId
 * @param {string} registration
 * @returns {object} phase updated
 */
const addStudent = async (phaseId, registration) => {
  await MongoDb.addOnArray(Student, "phases", phaseId);
  await MongoDb.addOnArray(Phase, "students", registration);
};

/**
 * Remove student from phase
 * @param {string} phaseId
 * @param {string} registration
 * @returns {object} phase updated
 */
const removeStudent = async (phaseId, registration) => {
  await MongoDb.removeOfArray(Student, "phases", phaseId);
  await MongoDb.removeOfArray(Phase, "students", registration);
};

/**
 * Remove phase by id
 * @param {string} id
 * @returns {object} phase removed
 */
const remove = async (id) => {
  await MongoDb.removeOfArray(Selection, "phases", id);
  await MongoDb.removeOfArray(Student, "phases", id);
  return await MongoDb.removeById(id);
};

/**
 * Remove phase by id
 * @param {string} id
 * @returns {object} phase removed
 */
const removeByIds = async (ids) => {
  const phases = await Phase.remove({ _id: { $in: ids } });
  const phaseIds = phases.map((phase) => phase._id);
  for (const phaseId in phaseIds) {
    await Student.update(DefaultObject, {
      $pull: { phases: phaseId },
    });
  }
  return phase;
};

/**
 * Update phase by id
 * @param {string} id
 * @param {array} students
 * @param {string} selectionId
 * @param {string} description
 * @returns {object} phase updated
 */
const update = async (id, { selectionId, description }) =>
  await MongoDb.updateById(Phase, id, {
    selectionId,
    description,
  });

/**
 * Validate phase
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validatePhase(object);
  return error;
};

/**
 * Get both the phase and the student by ID
 * @param {String} phaseId
 * @param {String} registration
 */
const getPhaseAndStudent = (phaseId, registration) =>
  Promise.all([
    Phase.findById(ObjectId(phaseId)),
    StudentController.getByRegistration(registration),
  ]);

/**
 * Verify if the phase and student were found and if the student is not in phase
 * @param {object} phase
 * @param {object} student
 * @param {object} registration
 */
const verifyAddOrRemoveStudent = (phase, student, addStudent) => {
  if (!phase && !student) {
    throw new Error("Phase and student not found");
  } else if (!phase) {
    throw new Error("Phase not found");
  } else if (!student) {
    throw new Error("Student not found");
  } else if (addStudent && phase.students.includes(student.registration)) {
    throw new Error("Student already registered in the phase");
  }
};

module.exports = {
  getAll,
  getById,
  create,
  addStudent,
  removeStudent,
  remove,
  removeByIds,
  validate,
  update,
  getStudentsPhase,
  getByIds,
};
