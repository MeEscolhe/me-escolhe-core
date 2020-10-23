"use strict";

const { Project, validateProject } = require("../models/project");
const mongoose = require("mongoose");

/**
 * Get all projects
 * @returns {array} list of all projects
 */
const getAll = async () => {
  const projects = await Project.find().sort("name");
  return projects;
};

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
const create = async ({ name, description, selections }) => {
  let project = new Project({
    name: name,
    description: description,
    selections: selections,
  });
  project = await project.save();
  return project;
};

/**
 * Update project by id
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {array} selections
 * @returns {object} project updated
 */
const update = async (id, { name, description, selections }) => {
  const project = await Project.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      description: description,
      selections: selections,
    },
    { new: true }
  );
  return project;
};

/**
 * Remove project by id
 * @param {string} id
 * @returns {object} project removed
 */
const remove = async (id) => {
  const project = await Project.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return project;
};

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
