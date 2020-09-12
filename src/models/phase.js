// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");

// Creating schema
const PhaseSchema = mongoose.model('Phase', new mongoose.Schema({
  students: {
    type: [String],
    required: true,
    default: [],
  },
  selectionId: {
    type: String,
    required: true,
  },
}));

// Exporting to controllers
exports.Phase = PhaseSchema;

