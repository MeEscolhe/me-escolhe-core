"use strict";

const { string } = require("joi");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { validate, id, arrayOfIds } = require("../middlewares/model-validator");

/**
 *  Phase model
 *  @typedef {{students: array, selectionId: string, description: string}} PhaseSchema
 */
const PhaseSchema = mongoose.model(
  "Phase",
  new mongoose.Schema({
    students: {
      type: [Number],
      ref: "Student",
      required: true,
      default: [],
    },
    selectionId: {
      type: ObjectId,
      ref: "Selection",
      required: true,
      validate: {
        validator: (v) => FKHelper(mongoose.model("Selection"), "_id", v),
        message: `selectionId doesn't exist`,
      },
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
      students: arrayOfIds(),
      selectionId: id(),
      description: string(),
    },
    phase
  );

module.exports = {
  Phase: PhaseSchema,
  validatePhase,
};
