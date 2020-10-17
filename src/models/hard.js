const Joi = require("joi");
const mongoose = require("mongoose");

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
      default: 0,
    },
  })
);

function valHard(hard) {
  const schemaHard = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    level: Joi.number().min(0).max(4).required(),
  });
  return schemaHard.validate(hard);
}

module.exports = {
  Hard: HardSchema,
  valHard,
};
