const mongoose = require("mongoose");
const {
  validate,
  string,
  numericRange,
} = require("../middlewares/model-validator");

/**
 *  Language model
 *  @typedef {{name: string, level: number}} LanguageSchema
 */
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

/**
 * Validate language from request
 * @param {LanguageSchema} language
 */
const validateLanguage = (language) => {
  return validate(
    {
      name: string(),
      level: numericRange(0, 2),
    },
    language
  );
};

module.exports = {
  Language: LanguageSchema,
  validateLanguage,
};
