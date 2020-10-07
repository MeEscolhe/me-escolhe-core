const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const Joi = require("joi");

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
  })
);

/**
 * validade phase from request
 * @param {PhaseSchema} phase
 */
const valPhase = (phase) => {
  const phaseSchema = Joi.object().keys({
    selectionId: Joi.string().min(3).max(30).required(),
    students: Joi.array().items(Joi.string()).min(0),
  });

  return phaseSchema.validate(phase);
};

module.exports = {
  Phase: PhaseSchema,
  valPhase,
};
