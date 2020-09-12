// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");

// Creating schema
const ExperienceSchema = mongoose.model('Experience',new mongoose.Schema({
  academic: {
    type: [String],
    required: true,
  },
  work: {
    type: [String],
    required: true,
  },
}));


function validateExperience(experience) {
  const schemaExperience = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(50).required()
  });


  return schemaExperience.validate(experience.body);
}


exports.Experience = ExperienceSchema; 
exports.valExperience = validateExperience;












