"use strict";

const { Phase, valPhase } = require("../models/phase");
const mongoose = require("mongoose");
const StudentController = require("./student");

const getAll = async () => {
  const phases = await Phase.find().sort("name");
  return phases;
};

const getById = async (id) => {
  const phase = await Phase.findById(mongoose.Types.ObjectId(id));
  return phase;
};

const create = async ({ students, selectionId, description }) => {
  let phase = new Phase({
    students: students,
    selectionId: selectionId,
    description: description ? description : "",
  });
  phase = await phase.save();
  return phase;
};

const addStudent = (phaseId, studentId) =>
  getPhaseAndStudent(phaseId, studentId).then(([phase, student]) => {
    verifyAddOrRemoveStudent(phase, student, true);
    phase.students.push(student.registration);

    return Phase.findByIdAndUpdate(phaseId, phase, { new: true }).then(
      (phase) => {
        if (!phase) throw "Phase not found";
        else {
          student.phases.push(phaseId);
          return StudentController.update(
            student.registration,
            { phases: student.phases },
            true
          ).then((student) => {
            if (student) {
              return "Added to Student";
            } else {
              phase.students = phase.students.filter(
                (registration) => registration !== student.registration
              );
              return Phase.findByIdAndUpdate(
                mongoose.Types.ObjectId(phaseId),
                phase,
                { new: true }
              ).then(() => {
                throw "Error when save student";
              });
            }
          });
        }
      }
    );
  });
const removeStudent = (phaseId, studentId) =>
  getPhaseAndStudent(phaseId, studentId).then(([phase, student]) => {
    verifyAddOrRemoveStudent(phase, student, false);
    phase.students = phase.students.filter(
      (studentFK) => studentFK !== studentId
    );
    student.phases = student.phases.filter((phase) => !phase.equals(phaseId));

    return StudentController.update(
      student.registration,
      { phases: student.phases },
      true
    ).then((student) => {
      if (student) {
        return Phase.findByIdAndUpdate(
          mongoose.Types.ObjectId(phaseId),
          phase,
          {
            new: true,
          }
        ).then(() => "Student removed");
      } else {
        throw "Student not found";
      }
    });
  });
const remove = async (id) => {
  const Phase = await Phase.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return Phase;
};
const update = async (id, { students, selectionId, description }) => {
  const phase = await Phase.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      students: students,
      selectionId: selectionId,
      description: description,
    },
    { new: true }
  );
  return phase;
};
const validate = (object) => {
  const { error } = valPhase(object);
  return error;
};
/**
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
