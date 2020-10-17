const Joi = require("joi");
const mongoose = require("mongoose");

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
    durationInMonths: {
      type: Number,
      min: 0,
    },
  })
);

function validateWorkExperience(workExperience) {
  const schemaWorkExperience = Joi.object().keys({
    role: Joi.string().min(3).max(30).required(),
    institution: Joi.string().min(3).max(50).required(),
    durationInMonths: Joi.number().greater(0),
  });

  return schemaWorkExperience.validate(workExperience.body);
}

module.exports = {
  WorkExperience: WorkExperienceSchema,
  validateWorkExperience,
};

exports.WorkExperience = WorkExperienceSchema;
exports.valWorkExperience = validateWorkExperience;
