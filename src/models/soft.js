// Importing dependences
const Joi = require('joi');

const mongoose = require("mongoose");

// Creating schema
const SoftSchema = mongoose.model('Soft', new mongoose.Schema({
  description: {
    type: String,
    required: true

  },
}));

function validateSoft(soft) {
  const schemaSoft = Joi.object().keys({
    description: Joi.string().min(4).max(50).required()
  });


  return schemaSoft.validate(soft.body);
}

exports.Soft = SoftSchema; 
exports.valSoft = validateSoft;





