const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { validate, arrayOfIds } = require("../middlewares/model-validator");

/**
 *  Experience model
 *  @typedef {{academic: array, work: array}} ExperienceSchema
 */
const ExperienceSchema = mongoose.model(
  "Experience",
  new mongoose.Schema({
    academic: {
      type: [ObjectId],
      ref: "AcademicExperienceSchema",
      required: true,
    },
    work: {
      type: [ObjectId],
      ref: "WorkExperienceSchema",
      required: true,
    },
  })
);

/**
 * Validate experience from request
 * @param {ExperienceSchema} experience
 */
const validateExperience = (experience) => {
  return validate(
    {
      academic: arrayOfIds(),
      work: arrayOfIds(),
    },
    experience
  );
};

exports.Experience = ExperienceSchema;

module.exports = {
  Experience: ExperienceSchema,
  validateExperience,
};
