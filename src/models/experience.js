const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const Joi = require("joi");

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

const valExperience = (experience) => {
  const experienceSchema = Joi.object().keys({
    academic: Joi.array().items(Joi.string()).min(0),
    work: Joi.array().items(Joi.string()).min(0)
  });

  return experienceSchema.validate(experience);
};

exports.Experience = ExperienceSchema;

module.exports = {
  Experience: ExperienceSchema,
  valExperience
};
