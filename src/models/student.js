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
  foreingKey,
  date,
  finalDate,
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
      academicExperiences: [
        {
          title: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
          institution: {
            type: String,
            required: true,
          },
          initialDate: {
            type: Date,
            required: true,
          },
          finalDate: {
            type: Date,
            required: true,
          },
        },
      ],
      workExperiences: [
        {
          role: {
            type: String,
            required: true,
          },
          institution: {
            type: String,
            required: true,
          },
          initialDate: {
            type: Date,
            required: true,
          },
          finalDate: {
            type: Date,
            required: true,
          },
        },
      ],
    },
    phases: foreingKey("Phase", "_id", ObjectId, true),
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
      experiences: {
        academicExperiences: array({
          title: string(),
          category: string(),
          institution: string(),
          initialDate: date(),
          finalDate: finalDate("initialDate"),
        }),
        workExperiences: array({
          role: string(),
          institution: string(),
          initialDate: date(),
          finalDate: finalDate("initialDate"),
        }),
      },
      phases: arrayOfIds(),
    },
    student
  );

module.exports = {
  Student: StudentSchema,
  validateStudent,
};
