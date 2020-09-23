// Importing dependences

const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

// Creating schema
const PhaseSchema = mongoose.model(
  "Phase",
  new mongoose.Schema({
    students: {
      type: [Number],
      ref: "StudentSchema",
      required: true,
      default: [],
    },
    selectionId: {
      type: ObjectId,
      ref: "SelectionSchema",
      required: true,
    },
  })
);

// Exporting to controllers
exports.Phase = PhaseSchema;
