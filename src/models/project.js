// Importing dependences

const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

// Creating schema
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
/*
function validateProject(project) {
  const schemaProject = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(50).required(),
    selections : project.selections
  });


  return schemaProject.validate(language.body);
}
*/
// Exporting to controllers
exports.Project = ProjectSchema;

//exports.valProject = validateProject;
