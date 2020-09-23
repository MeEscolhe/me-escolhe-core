// Importing dependences
const Joi = require("joi");

const mongoose = require("mongoose");

// Creating schema
const HardSchema = mongoose.model(
  "Hard",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
      default: 2,
      required: true,
      default: "",
    },
  })
);

function validateHard(hard) {
  const schemaHard = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(50).required(),
  });

  return schemaHard.validate(hard.body);
}

exports.Hard = HardSchema;
exports.valHard = validateHard;
