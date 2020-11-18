"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { FKHelper } = require("../middlewares/util");
const {
  validate,
  id,
  arrayOfRegistrations,
  string,
  modelValidator,
} = require("../middlewares/model-validator");

/**
 *  Phase model
 *  @typedef {{students: array, selectionId: string, description: string}} PhaseSchema
 */
const PhaseSchema = mongoose.model(
  "Phase",
  new mongoose.Schema({
    students: modelValidator(true, "Student", "registration", "number", true),
    selectionId: modelValidator(false, "Selection", "_id", "objectId", true),
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
