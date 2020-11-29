"use strict";

const mongoose = require("mongoose");
const {
  validate,
  string,
  date,
  finalDate,
} = require("../middlewares/model-validator");

/**
 *  Academic experience model
 *  @typedef {{title: string, category: string, institution: string, initialDate: Date, finalDate: Date}} AcademicExperienceSchema
 */
const AcademicExperienceSchema = mongoose.model(
  "AcademicExperience",
  new mongoose.Schema({
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
  })
);

/**
 * Validate academic experience from request
 * @param {AcademicExperienceSchema} academicExperience
 */
const validateAcademicExperience = (academicExperience) =>
  validate(
    {
      title: string(),
      category: string(),
      institution: string(),
      initialDate: date(),
      finalDate: finalDate("initialDate"),
    },
    academicExperience
  );

module.exports = {
  AcademicExperience: AcademicExperienceSchema,
  validateAcademicExperience,
};
