"use strict";

const { Project, validateProject } = require("../models/project");
const mongoose = require("mongoose");

/**
 * Get all projects
 * @returns {array} list of all projects
 */
const getAll = async () => await Project.find().sort("name");

/**
 * Get all projects by list id
 * @returns {array} list of all projects
 */
const getAllByListId = async (list_id) => {
  let objectIds = [];
  list_id.map((id) => objectIds.push(mongoose.Types.ObjectId(id)));
  return await Project.find({ _id: { $in: objectIds } }).sort("name");
};

/**
 * Get project by id
 * @param {string} id
 * @returns {object} project
 */
const getById = async (id) =>
  await Project.findById(mongoose.Types.ObjectId(id));

/**
 * Add selection to your respective project
 * @param {object} selection
 */
const addSelection = async (selection) => {
  let project = await getById(selection.projectId);
  project = { ...project._doc };
  project.selections.push(selection._id);
  await update(project._id, project);
};

/**
 * Remove selection to your respective project
 * @param {string} selectionId
 */
const removeSelection = async (selectionId) => {
  let project = await Project.findOne({ selections: selectionId.toString() });
  project = { ...project._doc };
  project.selections = project.selections.filter(
    (item) => item != selectionId.toString()
  );
  await update(project._id, project);
};

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

module.exports = {
  getAll,
  getAllByListId,
  getById,
  create,
  update,
  remove,
  validate,
  addSelection,
  removeSelection,
};
