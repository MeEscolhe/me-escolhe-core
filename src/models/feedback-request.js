const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { FKHelper } = require("../middlewares/util");

const FeedbackRequestSchema = mongoose.model(
  "FeedbackRequest",
  new mongoose.Schema({
    studentId: {
      type: Number,
      ref: "Student",
      required: true,
      validate: {
        validator: (v) =>
          FKHelper(mongoose.model("Student"), "registration", v),
        message: `studentId doesn't exist`,
      },
    },
    phaseId: {
      type: ObjectId,
      ref: "PhaseSchema",
      required: true,
      validate: {
        validator: (v) => FKHelper(mongoose.model("Phase"), "_id", v),
        message: `PhaseSchema doesn't exist`,
      },
    },
    teacherId: {
      type: ObjectId,
      ref: "Teacher",
      required: true,
      validate: {
        validator: (v) => FKHelper(mongoose.model("Teacher"), "_id", v),
        message: `Teacher id doesn't exist`,
      },
    },
  })
);

exports.FeedbackRequest = FeedbackRequestSchema;
