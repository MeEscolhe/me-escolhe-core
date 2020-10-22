"use strict";

const mongoose = require("mongoose");
const {
  validate,
  string,
  numericRange,
} = require("../middlewares/model-validator");

/**
 *  Hard skill model
 *  @typedef {{name: string, level: number}} HardSchema
 */
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

/**
 * Validate hard skill from request
 * @param {HardSchema} hard
 */
const validateHard = (hard) => {
  return validate(
    {
      name: string(),
      level: numericRange(0, 4),
    },
    hard
  );
};

module.exports = {
  Hard: HardSchema,
  validateHard,
};
