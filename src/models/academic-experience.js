const mongoose = require("mongoose");
const { validate, string } = require("../middlewares/model-validator");

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

/**
 * Validate academic experience from request
 * @param {AcademicExperienceSchema} academicExperience
 */
const validateAcademicExperience = (academicExperience) => {
  return validate(
    {
      title: string(),
      category: string(),
      institution: string(),
    },
    academicExperience
  );
};

module.exports = {
  AcademicExperience: AcademicExperienceSchema,
  validateAcademicExperience,
};
