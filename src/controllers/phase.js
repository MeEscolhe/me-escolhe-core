"use strict";

const { Phase, validatePhase, getStudentsData } = require("../models/phase");
const { Student } = require("../models/student");
const { DefaultObject } = require("../middlewares/values-provider");
const { ObjectId } = require("../middlewares/types-provider");
const StudentController = require("./student");

/**
 * Get all phases
 * @returns {array} list of all phases
 */
const getAll = async () => {
  const phases = await Phase.find().sort("name");
  for (let i = 0; i < phases.length; i++) {
    let phase = { ...phases[i]._doc };
    phases[i] = await getStudentsData(phase);
  }
  return phases;
};

/**
 * Get phase by id
 * @param {string} id
 * @returns {object} phase
 */
const getById = async (id) => {
  const phase = await Phase.findById(ObjectId(id));
  if (phase) {
    return await getStudentsData(phase);
  }
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
 * @param {string} registration
 * @returns {object} phase updated
 */
const addStudent = async (phaseId, registration) => {
  let [phase, student] = await getPhaseAndStudent(phaseId, registration);
  verifyAddOrRemoveStudent(phase, student, true);
  phase.students.push(student.registration);
  phase = await Phase.findByIdAndUpdate(phaseId, phase, { new: true });
  if (!phase) {
    throw new Error("Phase not found");
  } else {
    student.phases.push(phaseId);
    student = await StudentController.update(
      student.registration,
      { phases: student.phases },
      true
    );

    if (student) {
      return phase;
    } else {
      phase.students = phase.students.filter(
        (registration) => registration !== student.registration
      );
      return await Phase.findByIdAndUpdate(ObjectId(phaseId), phase, {
        new: true,
        runValidators: true,
      });
    }
  }
};

/**
 * Remove student from phase
 * @param {string} phaseId
 * @param {string} registration
 * @returns {object} phase updated
 */
const removeStudent = async (phaseId, registration) => {
  let [phase, student] = await getPhaseAndStudent(phaseId, registration);
  verifyAddOrRemoveStudent(phase, student, false);
  phase.students = phase.students.filter(
    (studentFK) => studentFK.toString() !== registration.toString()
  );
  student.phases = student.phases.filter((phase) => !phase.equals(phaseId));
  student = await StudentController.update(
    student.registration,
    { phases: student.phases },
    true
  );
  if (student) {
    return await Phase.findByIdAndUpdate(ObjectId(phaseId), phase, {
      new: true,
    });
  } else {
    throw "Student not found";
  }
};

/**
 * Remove phase by id
 * @param {string} id
 * @returns {object} phase removed
 */
const remove = async (id) => {
  await Student.update(DefaultObject, {
    $pull: { phases: id },
  });
  return await Phase.findByIdAndRemove(ObjectId(id));
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
const update = async (id, { students, selectionId, description }) =>
  await Phase.findByIdAndUpdate(
    ObjectId(id),
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
