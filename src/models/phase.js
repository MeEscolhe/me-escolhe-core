"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const {
  validate,
  id,
  arrayOfRegistrations,
  string,
} = require("../middlewares/model-validator");
/**
 *  Phase model
 *  @typedef {{students: array, selectionId: string, description: string}} PhaseSchema
 */
const PhaseSchema = mongoose.model(
  "Phase",
  new mongoose.Schema({
    students: {
      type: [Number],
      required: true,
      default: [],
    },
    selectionId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  })
);

/**
 * Validade phase from request
 * @param {PhaseSchema} phase
 */
const validatePhase = (phase) =>
  validate(
    {
      students: arrayOfRegistrations(),
      selectionId: id(),
      description: string(),
    },
    phase
  );

module.exports = {
  Phase: PhaseSchema,
  validatePhase,
};
