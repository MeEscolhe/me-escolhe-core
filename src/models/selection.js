const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

// Creating schema
const SelectionSchema = mongoose.model(
  "Selection",
  new mongoose.Schema({
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    phases: {
      type: [ObjectId],
      ref: "PhaseSchema",
      default: [],
    },
    current: {
      type: Boolean,
      required: true,
      default: true,
    },
  })
);

exports.Selection = SelectionSchema;
