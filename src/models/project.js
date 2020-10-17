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
function validateProject(project) {
  const ProjectSchema = Joi.object().keys({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().optional().allow("").min(0).max(50),
    selections: Joi.array().items(Joi.string()).min(0),
  });
  
  return ProjectSchema.validate(project.body);
}

module.exports = {
  Project: ProjectSchema,
  validateProject,
};

