const Joi = require("joi");
const mongoose = require("mongoose");

const SoftSchema = mongoose.model(
  "Soft",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

function valSoft(soft) {
  const schemaSoft = Joi.object().keys({
    name: Joi.string().min(4).max(50).required(),
  });
  return schemaSoft.validate(soft);
}

module.exports = {
  Soft: SoftSchema,
  valSoft,
};
