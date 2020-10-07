const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const TeacherSchema = mongoose.model(
  "Teacher",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    labId: {
      type: ObjectId,
      ref: "LabSchema",
    },
    managements: {
      type: [ObjectId],
      ref: "ProjectSchema",
      default: [],
    },
    feedbackRequests: {
      type: [ObjectId],
      ref: "FeedbackRequestSchema",
      default: [],
    },
  })
);

exports.Teacher = TeacherSchema;
