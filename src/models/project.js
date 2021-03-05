"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const {
  validate,
  string,
  id,
  arrayOfIds,
  foreingKey,
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
    labId: foreingKey("Lab", "_id", ObjectId),
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
    },
    project
  );

module.exports = {
  Project: ProjectSchema,
  validateProject,
};
