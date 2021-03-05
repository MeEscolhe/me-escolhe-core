"use strict";

const mongoose = require("mongoose");
const { validate, string } = require("../middlewares/model-validator");

/**
 *  Lab model
 *  @typedef {{name: string, description: string}} LabSchema
 */
const LabSchema = mongoose.model(
  "Lab",
  new mongoose.Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
  })
);

/**
 * Validate lab from request
 * @param {LabSchema} lab
 */
const validateLab = (lab) =>
  validate(
    {
      name: string(),
      description: string(),
    },
    lab
  );

module.exports = {
  Lab: LabSchema,
  validateLab,
};
