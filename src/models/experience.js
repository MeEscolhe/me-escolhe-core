"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const {
  validate,
  arrayOfIds,
  foreingKey,
} = require("../middlewares/model-validator");

/**
 *  Experience model
 *  @typedef {{academic: array, work: array}} ExperienceSchema
 */
const ExperienceSchema = mongoose.model(
  "Experience",
  new mongoose.Schema({
    academic: foreingKey("AcademicExperience", "_id", ObjectId, true),
    work: foreingKey("WorkExperience", "_id", ObjectId, true),
  })
);

/**
 * Validate experience from request
 * @param {ExperienceSchema} experience
 */
const validateExperience = (experience) =>
  validate(
    {
      academic: arrayOfIds(),
      work: arrayOfIds(),
    },
    experience
  );

exports.Experience = ExperienceSchema;

module.exports = {
  Experience: ExperienceSchema,
  validateExperience,
};
