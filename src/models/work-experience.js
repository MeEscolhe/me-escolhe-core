const Joi = require("joi");
const mongoose = require("mongoose");
const {
  validate,
  string,
  number,
  date,
  finalDate,
} = require("../middlewares/model-validator");

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

function valWorkExperience(workExperience) {
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
  valWorkExperience,
};
