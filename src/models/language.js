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

function validateLanguage(language) {
  const schemaLanguage = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(50).required(),
  });

  return schemaLanguage.validate(language.body);
}

exports.Language = LanguageSchema;
exports.valLanguage = validateLanguage;
