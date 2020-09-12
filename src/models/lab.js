// Importing dependences
const Joi = require('joi');

const mongoose = require("mongoose");

// Creating schema
const LabSchema = mongoose.model('Lab', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
}));

function validateLab(lab) {
  const schemaLab = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(50).required()
  });


  return schemaLab.validate(lab.body);
}

exports.Lab = LabSchema; 
exports.valLab = validateLab;





