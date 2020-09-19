// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;


// Creating schema
const ExperienceSchema = mongoose.model('Experience',new mongoose.Schema({
  academic: {
    type: [ObjectId],
    ref: 'AcademicExperienceSchema',
    required: true,
  },
  work: {
    type: [ObjectId],
    ref: 'WorkExperienceSchema',
    required: true,
  },
}));

/*
function validateExperience(experience) {
  const schemaExperience = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(50).required()
  });


  return schemaExperience.validate(experience.body);
}*/


exports.Experience = ExperienceSchema; 
//exports.valExperience = validateExperience;












