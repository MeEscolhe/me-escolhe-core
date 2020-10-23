const Joi = require("joi");
const mongoose = require("mongoose");

const LabSchema = mongoose.model(
  "Lab",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
  })
);

function valLab(lab) {
  const schemaLab = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(50).required(),
  });

  return schemaLab.validate(lab);
}

module.exports = {
  Lab: LabSchema,
  valLab,
};
