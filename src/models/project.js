// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");

// Creating schema
const ProjectSchema = mongoose.model('Project', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  selections: {
    type: [String],
    required: true,
    default: [],
  },
}));

// Exporting to controllers
exports.Project = ProjectSchema; 



