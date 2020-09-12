// Importing dependences
const Joi = require('joi');
const mongoose = require('mongoose');


// Creating schema
const SkillSchema = mongoose.model('Skill',new mongoose.Schema({
  languages: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: Number,
          min: 0,
          max: 2,
          required: true,
        },
      },
    ],
    required: true,
    default: [],
  },
  soft: {
    type: [String],
    required: true,
    default: [],
  },
  hard: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: Number,
          min: 0,
          max: 4,
          required: true,
        },
      },
    ],
    required: true,
    default: [],
  },
}));



exports.Experience = ExperienceSchema; 

















