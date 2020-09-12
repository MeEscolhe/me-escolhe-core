// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");

// Creating schema
const TeacherSchema = mongoose.model('Teacher', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  labId: {
    type: String,
    required: true,
  },
  managements: {
    type: [String],
    required: true,
    default: [],
  },
  feedbackRequests: {
    type: [String],
    required: true,
    default: [],
  },
}));

// Exporting to controllers
exports.Teacher = TeacherSchema; 













