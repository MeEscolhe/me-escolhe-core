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
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
  })
);

/**
 * Validate lab from request
 * @param {LabSchema} lab
 */
const validateLab = (lab) => {
  return validate(
    {
      name: string(),
      description: string(),
    },
    lab
  );
};

module.exports = {
  Lab: LabSchema,
  validateLab,
};
