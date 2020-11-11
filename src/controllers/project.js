"use strict";

const { Project, validateProject } = require("../models/project");
const mongoose = require("mongoose");

/**
 * Get all projects
 * @returns {array} list of all projects
 */
const getAll = async () => await Project.find().sort("name");

/**
 * Get project by id
 * @param {string} id
 * @returns {object} project
 */
const getById = async (id) =>
  await Project.findById(mongoose.Types.ObjectId(id));

/**
 * Create project
 * @param {string} name
 * @param {string} description
 * @param {array} selections
 * @returns {object} project created
 */
const create = async ({ name, description, labId, selections }) => {
  const project = new Project({
    name: name,
    description: description,
    labId: labId,
    selections: selections,
  });
  return await project.save();
};

/**
 * Update project by id
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {array} selections
 * @returns {object} project updated
 */
const update = async (id, { name, description, labId, selections }) =>
  await Project.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      description: description,
      labId: labId,
      selections: selections,
    },
    { new: true }
  );

/**
 * Remove project by id
 * @param {string} id
 * @returns {object} project removed
 */
const remove = async (id) =>
  await Project.findByIdAndRemove(mongoose.Types.ObjectId(id));

/**
 * Validate project
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateProject(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
