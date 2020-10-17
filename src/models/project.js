const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const Joi = require("joi");

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
function valProject(project) {
  const ProjectSchema = Joi.object().keys({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().allow("").min(0).max(50).required(),
    selections: Joi.array().items(Joi.string()).min(0).required(),
  });

  return ProjectSchema.validate(project);
}

module.exports = {
  Project: ProjectSchema,
  valProject,
};
