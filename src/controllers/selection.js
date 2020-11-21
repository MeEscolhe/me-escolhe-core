"use strict";

const { Selection, validateSelection } = require("../models/selection");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/**
 * Get all selections
 * @returns {array} list of all selections
 */
const getAll = async ({ page, limit }) =>
  await Selection.paginate({}, { page, limit });

/**
 * Get selection by id
 * @param {string} id
 * @returns {object} selection
 */
const getById = async (id) => await Selection.findById(ObjectId(id));

/**
 * Create selection,phase and push selection id in project selections list
 * @param {string} role
 * @param {string} description
 * @param {array} phases
 * @param {boolean} current
 * @param {array} skills
 * @returns {object} project created
 */
const create = async ({
  role,
  description,
  current,
  projectId,
  phases,
  skills,
}) => {
  const ProjectController = require("../controllers/project");
  const PhaseController = require("../controllers/phase");
  let selection = await new Selection({
    role: role,
    description: description,
    phases: phases,
    current: current,
    projectId: projectId,
    skills: skills,
  }).save();
  const phase = await PhaseController.create({
    students: [],
    selectionId: selection._id,
    description: "",
  });
  selection.phases.push(phase._id);
  let project = await ProjectController.getById(projectId);
  project.selections.push(selection._id);
  await ProjectController.update(projectId, project);
  return await update(selection._id, selection);
};

/**
 * Update selection by id
 * @param {string} id
 * @param {object} updateData, data to update
 * @returns {object} selection updated
 */
const update = async (id, updateData) =>
  await Selection.findByIdAndUpdate(ObjectId(id), updateData, { new: true });

/**
 * Remove selection by id
 * @param {string} id
 * @returns {object} selection removed
 */
const remove = async (id) => await Selection.findByIdAndRemove(ObjectId(id));

/**
 * Validate selection
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateSelection(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
