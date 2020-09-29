const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

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

exports.Phase = PhaseSchema;
