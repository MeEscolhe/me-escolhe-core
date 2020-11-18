"use strict";

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
      type: [
        {
          type: ObjectId,
          validate: {
            validator: (v) =>
              FKHelper(mongoose.model("AcademicExperience"), "_id", v),
            message: (props) => `${props.value} doesn't exist`,
          },
        },
      ],
      ref: "AcademicExperience",
      required: true,
    },
    work: {
      type: [
        {
          type: ObjectId,
          validate: {
            validator: (v) =>
              FKHelper(mongoose.model("WorkExperience"), "_id", v),
            message: (props) => `${props.value} doesn't exist`,
          },
        },
      ],
      ref: "WorkExperience",
      required: true,
    },
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
