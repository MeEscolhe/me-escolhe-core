const { string } = require("joi");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { validate, id, arrayOfIds } = require("../middlewares/model-validator");

/**
 *
 *  @typedef {{students: array, selectionId: ObjectId}} PhaseSchema
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
const validatePhase = (phase) => {
  return validate(
    {
      students: arrayOfIds(),
      selectionId: id(),
      description: string(),
    },
    phase
  );
};

module.exports = {
  Phase: PhaseSchema,
  validatePhase,
};
