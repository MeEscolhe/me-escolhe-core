"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { FKHelper } = require("../middlewares/util");
const {
  validate,
  id,
  arrayOfRegistrations,
  string,
  foreingKeyValidatorSchema,
} = require("../middlewares/model-validator");

/**
 *  Phase model
 *  @typedef {{students: array, selectionId: string, description: string}} PhaseSchema
 */
const PhaseSchema = mongoose.model(
  "Phase",
  new mongoose.Schema({
    students: foreingKeyValidatorSchema(
      "Student",
      "registration",
      Number,
      true
    ),
    selectionId: foreingKeyValidatorSchema("Selection", "_id", ObjectId),
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
