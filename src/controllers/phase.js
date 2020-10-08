"use strict";

const { Phase, valPhase } = require("../models/phase");
const mongoose = require("mongoose");
const { Student } = require("../models/student");
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
        if (!phase) throw "Fase não encontrada";
        else {
          student.phases.push(phaseId);
          return StudentController.update(
            student.registration,
            { phases: student.phases },
            true
          ).then((student) => {
            if (student) {
              return "Student add";
            } else {
              phase.students = phase.students.filter(
                (registration) => registration !== student.registration
              );
              return Phase.findByIdAndUpdate(
                mongoose.Types.ObjectId(phaseId),
                phase,
                { new: true }
              ).then(() => {
                throw "Erro ao salvar o estudante";
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
        Phase.findByIdAndUpdate(mongoose.Types.ObjectId(phaseId), phase, {
          new: true,
        }).then(() => "Estudante removido");
      } else {
        throw "Estudante não encontrado";
      }
    });
  });
const remove = async (id) => {
  const Phase = await Phase.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return Phase;
};
const update = async (id, { students, selectionId, description }) => {
  const Phase = await Phase.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      students: students,
      selectionId: selectionId,
      description: description,
    },
    { new: true }
  );
  return Phase;
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
    throw "fase e estudante não encontrados";
  } else if (!phase) {
    throw "Fase não encontrada";
  } else if (!student) {
    throw "Estudante não encontrado";
  } else if (addStudent && phase.students.includes(student.registration)) {
    throw "Estudante já cadastrado na fase";
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
