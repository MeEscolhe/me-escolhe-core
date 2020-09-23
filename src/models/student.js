const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const StudentSchema = mongoose.model(
  "Student",
  new mongoose.Schema({
    registration: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cra: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    skills: {
      type: [ObjectId],
      ref: "SkillSchema",
      default: [],
    },
    experiences: {
      type: [ObjectId],
      ref: "ExperienceSchema",
      default: [],
    },
    phases: {
      type: [ObjectId],
      ref: "PhaseSchema",
      default: [],
    },
  })
);

exports.Student = StudentSchema;
