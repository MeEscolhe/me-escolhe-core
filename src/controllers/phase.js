"use strict";

const { Phase, valPhase } = require("../models/phase");
const mongoose = require("mongoose");
const { Student } = require("../models/student");

const getAll = async () => {
  const Phase = await Phase.find().sort("name");
  return Phase;
};

const getById = async (id) => {
  const phase = await Phase.findById(mongoose.Types.ObjectId(id));
  return phase;
};

const create = async ({ students, selectionId }) => {
  let phase = new Phase({
    students: students,
    selectionId: selectionId,
  });
  phase = await phase.save();
  return phase;
};

const addStudent = async (phaseId, studentId) => {
  const StudentController = require("./student");

  return Promise.all([
    Phase.findById(mongoose.Types.ObjectId(phaseId)),
    StudentController.getByRegistration(studentId),
  ]).then(([phase, student]) => {
    if (!phase && !student) {
      throw "fase e estudante não encontrados";
    } else if (!phase) {
      throw "Fase não encontrada";
    } else if (!student) {
      throw "Estudante não encontrado";
    } else if (phase.students.includes(studentId)) {
      throw "Estudante já cadastrado na fase";
    } else {
      phase.students.push(student.registration);
      return Phase.findByIdAndUpdate(phaseId, phase, { new: true }).then(
        (phase) => {
          if (!phase) throw "Fase não encontrada";
          else {
            student.phases.push(phaseId);
            console.log("eae");
            return StudentController.update(student.registration, student).then(
              (student) => {
                console.log(student);
                if (!student) {
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
              }
            );
          }
        }
      );
    }
  });
};

const remove = async (id) => {
  const Phase = await Phase.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return Phase;
};

const validate = (object) => {
  const { error } = valPhase(object);
  return error;
};

module.exports = { getAll, getById, create, addStudent, remove, validate };
