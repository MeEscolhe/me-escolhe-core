"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const {
  validate,
  string,
  id,
  arrayOfIds,
  foreingKeyValidatorSchema,
} = require("../middlewares/model-validator");

/**
 *  Phase model
 *  @typedef {{name: string, description: string, selections: array}} ProjectSchema
 */
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
    labId: foreingKeyValidatorSchema("Lab", "_id", ObjectId),
    selections: foreingKeyValidatorSchema("Selection", "_id", ObjectId, true),
  })
);

/**
 * Validade project from request
 * @param {ProjectSchema} project
 */
const validateProject = (project) =>
  validate(
    {
      name: string(),
      description: string(),
      labId: id(),
      selections: arrayOfIds(),
    },
    project
  );

module.exports = {
  Project: ProjectSchema,
  validateProject,
};
