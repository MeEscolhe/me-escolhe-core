"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { foreingKeyValidatorSchema } = require("../middlewares/model-validator");

/**
 *  Feedback request model
 *  @typedef {{studentId: number, phaseId: string, teacherId: string}} FeedbackRequestSchema
 */
const FeedbackRequestSchema = mongoose.model(
  "FeedbackRequest",
  new mongoose.Schema({
    studentId: foreingKeyValidatorSchema("Student", "registration", Number),
    phaseId: foreingKeyValidatorSchema("Phase", "_id", ObjectId),
    teacherId: foreingKeyValidatorSchema("Teacher", "_id", ObjectId),
  })
);

module.exports = {
  FeedbackRequest: FeedbackRequestSchema,
};
