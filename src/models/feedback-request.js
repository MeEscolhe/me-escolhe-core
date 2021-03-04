"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { foreingKey } = require("../middlewares/model-validator");

/**
 *  Feedback request model
 *  @typedef {{studentId: number, phaseId: string, teacherId: string}} FeedbackRequestSchema
 */
const FeedbackRequestSchema = mongoose.model(
  "FeedbackRequest",
  new mongoose.Schema({
    studentId: foreingKey("Student", "registration", Number),
    phaseId: foreingKey("Phase", "_id", ObjectId),
    teacherId: foreingKey("Teacher", "_id", ObjectId),
  })
);

module.exports = {
  FeedbackRequest: FeedbackRequestSchema,
};
