const Joi = require("joi");
const mongoose = require("mongoose");
const {
  validate,
  string,
  date,
  finalDate,
} = require("../middlewares/model-validator");

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

function valAcademicExperience(academicExperience) {
  return validate(
    {
      title: string(),
      category: string(),
      institution: string(),
      initialDate: date(),
      finalDate: finalDate("initialDate"),
    },
    academicExperience
  );
}

module.exports = {
  AcademicExperience: AcademicExperienceSchema,
  valAcademicExperience,
};
