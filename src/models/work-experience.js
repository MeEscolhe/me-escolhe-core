"use strict";

const mongoose = require("mongoose");
const {
  validate,
  string,
  number,
  date,
  finalDate,
} = require("../middlewares/model-validator");

/**
 *  Work experience model
 *  @typedef {{role: string, institution: string, durationInMonths: number}} WorkExperienceSchema
 */
const WorkExperienceSchema = mongoose.model(
  "WorkExperience",
  new mongoose.Schema({
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
  })
);

/**
 * Validade work experience from request
 * @param {WorkExperienceSchema} workExperience
 */
function validateWorkExperience(workExperience) {
  return validate(
    {
      role: string(),
      institution: string(),
      initialDate: date(),
      finalDate: finalDate("initialDate"),
    },
    workExperience
  );
}

module.exports = {
  WorkExperience: WorkExperienceSchema,
  validateWorkExperience,
};
