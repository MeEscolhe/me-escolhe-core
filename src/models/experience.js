const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const ExperienceSchema = mongoose.model(
  "Experience",
  new mongoose.Schema({
    academic: {
      type: [ObjectId],
      ref: "AcademicExperienceSchema",
      required: true,
    },
    work: {
      type: [ObjectId],
      ref: "WorkExperienceSchema",
      required: true,
    },
  })
);

exports.Experience = ExperienceSchema;
