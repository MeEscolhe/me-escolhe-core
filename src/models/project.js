const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const ProjectSchema = mongoose.model(
  "Project",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    selections: {
      type: [ObjectId],
      ref: "SelectionSchema",
      default: [],
    },
  })
);

exports.Project = ProjectSchema;
