const Joi = require("joi");
const mongoose = require("mongoose");

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
  })
);

function valAcademicExperience(academicExperience) {
  const schemaAcademicExperience = Joi.object().keys({
    title: Joi.string().min(4).max(30).required(),
    category: Joi.string().min(4).max(50).required(),
    institution: Joi.string().min(3).max(50).required(),
  });

  return schemaAcademicExperience.validate(academicExperience);
}

module.exports = {
  AcademicExperience: AcademicExperienceSchema,
  valAcademicExperience,
};
