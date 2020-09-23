// Importing dependences

const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

// Creating schema
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
      //required: true,
      default: "",
    },
    labId: {
      type: ObjectId,
      ref: "LabSchema",
      //required: true
    },
    managements: {
      type: [ObjectId],
      ref: "ProjectSchema",
      //required: true,
      default: [],
    },
    feedbackRequests: {
      type: [ObjectId],
      ref: "FeedbackRequestSchema",
      //required: true,
      default: [],
    },
  })
);

// Exporting to controllers
exports.Teacher = TeacherSchema;
