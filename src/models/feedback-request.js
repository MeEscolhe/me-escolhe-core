const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const FeedbackRequestSchema = mongoose.model(
  "FeedbackRequest",
  new mongoose.Schema({
    studentId: {
      type: Number,
      ref: "StudentSchema",
      required: true,
    },
    phaseId: {
      type: ObjectId,
      ref: "PhaseSchema",
      required: true,
    },
  })
);

exports.FeedbackRequest = FeedbackRequestSchema;
