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
 * validade phase from request
 * @param {PhaseSchema} phase
 */
const valPhase = (phase) => {
  const phaseSchema = Joi.object().keys({
    selectionId: Joi.string().min(3).max(30).required(),
    students: Joi.array().items(Joi.string()).min(0).required(),
    description: Joi.string().allow("").min(0).max(50).required(),
  });

  return phaseSchema.validate(phase);
};

module.exports = {
  Phase: PhaseSchema,
  valPhase,
};
