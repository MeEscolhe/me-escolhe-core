const mongoose = require("mongoose");
const { validate, string } = require("../middlewares/model-validator");

/**
 *  Soft model
 *  @typedef {{name: string}} SoftSchema
 */
const SoftSchema = mongoose.model(
  "Soft",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

/**
 * Validate soft skill from request
 * @param {SoftSchema} soft
 */
function validateSoft(soft) {
  return validate(
    {
      name: string(),
    },
    soft
  );
}

module.exports = {
  Soft: SoftSchema,
  validateSoft,
};
