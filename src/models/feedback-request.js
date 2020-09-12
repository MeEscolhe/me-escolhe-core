// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");

// Creating schema
const FeedbackRequestSchema = mongoose.model('FeedbackRequest', new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  phaseId: {
    type: String,
    required: true,
  },
}));

// Exporting to controllers
exports.FeedbackRequest = FeedbackRequestSchema; 






