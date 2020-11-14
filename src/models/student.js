"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const {
  array,
  validate,
  number,
  numericRange,
  string,
  arrayOfIds,
} = require("../middlewares/model-validator");

/**
 *  Student model
 *  @typedef {{registration: number, name: string, email: string, cra: number, description: string, skills: array, experiences: array, phases: array}} StudentSchema
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
      unique: true,
    },
    password: {
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
      hardSkills: [
        {
          name: {
            type: String,
            required: true,
          },
          level: {
            type: Number,
            enum: [0, 1, 2, 3, 4],
            default: 2,
            required: true,
            default: 0,
          },
        },
      ],
      softSkills: [
        {
          name: {
            type: String,
            required: true,
          },
        },
      ],
      languages: [
        {
          name: {
            type: String,
            required: true,
          },
          level: {
            type: Number,
            enum: [0, 1, 2],
            default: 1,
            required: true,
            default: "",
          },
        },
      ],
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
const validateStudent = (student) =>
  validate(
    {
      registration: number(),
      name: string(),
      password: string(),
      description: string(),
      email: string(),
      cra: numericRange(0, 10),
      skills: {
        hardSkills: array({
          name: string(),
          level: numericRange(0, 4),
        }),
        softSkills: array({
          name: string(),
        }),
        languages: array({
          name: string(),
          level: numericRange(0, 2),
        }),
      },
      experiences: arrayOfIds(),
      phases: arrayOfIds(),
    },
    student
  );

/**
 * Get student with his selections
 * @param {StudentSchema} student
 */
const getStudentWithSelections = (student) => {
  const { getSelectionFromPhase } = require("../middlewares/util");
  return Promise.all(
    student.phases.map((phase) => getSelectionFromPhase(phase))
  )
    .then((selections) => {
      const catchError = selections.filter((selection) => selection.error);
      if (catchError.length === 0) {
        const selectionsData = selections.map((selection) => {
          const {
            phaseId,
            selectionId,
            role,
            description,
            phases,
            current,
          } = selection;
          const indexOfPhase = phases.indexOf(phaseId);
          const currentPhase = phases.length;

          return {
            selection: { selectionId, role, description, current },
            phase: {
              phaseId: phaseId,
              current: currentPhase,
              studentIsParticipating: indexOfPhase + 1 === currentPhase,
            },
          };
        });
        const {
          registration,
          name,
          email,
          cra,
          description,
          skills,
          experiences,
        } = student;

        return {
          registration,
          name,
          email,
          cra,
          description,
          skills,
          experiences,
          selections: selectionsData,
        };
      } else {
        return {
          error: catchError,
        };
      }
    })
    .catch((e) => {
      return { error: e };
    });
};

module.exports = {
  Student: StudentSchema,
  validateStudent,
  getStudentWithSelections,
};
