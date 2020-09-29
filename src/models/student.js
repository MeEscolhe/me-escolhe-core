const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const Joi = require("joi");
/**
 *
 *  @typedef {{registration: number,name: string,email: string,cra: number,description:string,skills:array,experiences: array,phases: array}} StudentSchema
 */
const StudentSchema = mongoose.model(
  "Student",
  new mongoose.Schema({
    registration: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cra: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    skills: {
      type: [ObjectId],
      ref: "SkillSchema",
      default: [],
    },
    experiences: {
      type: [ObjectId],
      ref: "ExperienceSchema",
      default: [],
    },
    phases: {
      type: [ObjectId],
      ref: "PhaseSchema",
      default: [],
    },
  })
);

/**
 * validade student from request
 * @param {StudentSchema} student
 */
const valStudent = (student) => {
  const studentSchema = Joi.object().keys({
    registration: Joi.number().min(0).required(),
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().optional().allow("").min(0).max(50),
    email: Joi.string().min(10).required(),
    cra: Joi.number().min(0).max(10).required(),
    skills: Joi.array().items(Joi.string()).min(0),
    experiences: Joi.array().items(Joi.string()).min(0),
    phases: Joi.array().items(Joi.string()).min(0),
  });

  return studentSchema.validate(student);
};
/**
 * get student with selections 
 * 
 */
const getStudentWithSelections = () => {
  const { getSelectionFromPhase } = require('../middlewares/util');
  return Promise.all(this.phases.map((phase) => getSelectionFromPhase(phase))).then((selections) => {
    const catchError = selections.filter((selections) => selection.error);
    if (catchError.length === 0) {

      const selectionsData = selections.map((selection) => {
        const indexOfPhase = selection.phases.indexOf(selection.phaseId);
        const currentPhase = selection.phases.length;
        delete selection.phases;
        return {
          ...selections,
          phase: {
            current: currentPhase,
            studentIsParticipating: indexOfPhase + 1 === currentPhase
          };
        }
      });
      return {
        registration: this.registration,
        name: this.name,
        email: this.email,
        cra: this.cra,
        description: this.description,
        skills: this.skills,
        experiences: this.experiences
        selections: selectionsData
      }
    } else {
      return {
        error: catchError
      }
    }

  }).catch((e) => ({ error: e }))
}

module.exports = { Student: StudentSchema, valStudent, getStudentWithSelections };
