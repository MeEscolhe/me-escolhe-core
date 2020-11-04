const Joi = require("joi");
const mongoose = require("mongoose");

const LanguageSchema = mongoose.model(
  "Language",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      enum: [0, 1, 2],
      default: 1,
      required: true,
      default: "",
    },
  })
);

function valLanguage(language) {
  const schemaLanguage = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    level: Joi.number().min(0).max(2).required(),
  });
  return schemaLanguage.validate(language);
}

module.exports = {
  Language: LanguageSchema,
  valLanguage,
};
