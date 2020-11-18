"use strict";

const { Phase, validatePhase } = require("../models/phase");
const mongoose = require("mongoose");
const StudentController = require("./student");

/**
 * Get all phases
 * @returns {array} list of all phases
 */
const getAll = async () => await Phase.find().sort("name");

/**
 * Get phase by id
 * @param {string} id
 * @returns {object} phase
 */
const getById = async (id) => await Phase.findById(mongoose.Types.ObjectId(id));

/**
 * Create phase
 * @param {array} students
 * @param {string} selectionId
 * @param {string} description
 * @returns {object} phase created
 */
const create = async ({ students, selectionId, description }) => {
  const phase = new Phase({
    students: students,
    selectionId: selectionId,
    description: description ? description : "",
  });
  return await phase.save();
};

/**
 * Add student to phase
 * @param {string} phaseId
 * @param {string} studentId
 * @returns {object} phase updated
 */
const addStudent = async (phaseId, studentId) => {
  const [phase, student] = await getPhaseAndStudent(phaseId, studentId);
  verifyAddOrRemoveStudent(phase, student, true);
  phase.students.push(student.registration);
  phase = await Phase.findByIdAndUpdate(phaseId, phase, { new: true });
  if (!phase) {
    throw "Phase not found";
  } else {
    student.phases.push(phaseId);
    student = await StudentController.update(
      student.registration,
      { phases: student.phases },
      true
    );
    if (student) {
      return student;
    } else {
      phase.students = phase.students.filter(
        (registration) => registration !== student.registration
      );
      return await Phase.findByIdAndUpdate(
        mongoose.Types.ObjectId(phaseId),
        phase,
        { new: true, runValidators: true }
      );
    }
  }
};

/**
 * Remove student from phase
 * @param {string} phaseId
 * @param {string} studentId
 * @returns {object} phase updated
 */
const removeStudent = async (phaseId, studentId) => {
  const [phase, student] = await getPhaseAndStudent(phaseId, studentId);
  verifyAddOrRemoveStudent(phase, student, false);
  phase.students = phase.students.filter(
    (studentFK) => studentFK !== studentId
  );
  student.phases = student.phases.filter((phase) => !phase.equals(phaseId));
  student = await StudentController.update(
    student.registration,
    { phases: student.phases },
    true
  );
  if (student) {
    return await Phase.findByIdAndUpdate(
      mongoose.Types.ObjectId(phaseId),
      phase,
      {
        new: true,
      }
    );
  } else {
    throw "Student not found";
  }
};

/**
 * Remove phase by id
 * @param {string} id
 * @returns {object} phase removed
 */
const remove = async (id) =>
  await Phase.findByIdAndRemove(mongoose.Types.ObjectId(id));

/**
 * Update phase by id
 * @param {string} id
 * @param {array} students
 * @param {string} selectionId
 * @param {string} description
 * @returns {object} phase updated
 */
const update = async (id, { students, selectionId, description }) =>
  await Phase.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      students: students,
      selectionId: selectionId,
      description: description,
    },
    { new: true, runValidators: true }
  );

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
 * @param {String} studentId
 */
const getPhaseAndStudent = (phaseId, studentId) =>
  Promise.all([
    Phase.findById(mongoose.Types.ObjectId(phaseId)),
    StudentController.getByRegistration(studentId),
  ]);

/**
 * Verify if the phase and student were found and if the student is not in phase
 * @param {object} phase
 * @param {object} student
 * @param {object} studentId
 */
const verifyAddOrRemoveStudent = (phase, student, addStudent) => {
  if (!phase && !student) {
    throw "Phase and student not found";
  } else if (!phase) {
    throw "Phase not found";
  } else if (!student) {
    throw "Estudante not found";
  } else if (addStudent && phase.students.includes(student.registration)) {
    throw "Student already registered in the phase";
  }
};

module.exports = {
  getAll,
  getById,
  create,
  addStudent,
  removeStudent,
  remove,
  validate,
  update,
};
