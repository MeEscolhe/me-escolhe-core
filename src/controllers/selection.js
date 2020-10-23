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
const getById = async (id) => await Selection.findById(id);

/**
 * Create selection
 * @param {string} role
 * @param {string} description
 * @param {array} phases
 * @param {boolean} current
 * @param {array} skills
 * @returns {object} project created
 */
const create = async ({ role, description, phases, current, skills }) => {
  const selection = new Selection({
    role: role,
    description: description,
    phases: phases,
    current: current,
    skills: skills,
  });
  return await selection.save();
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
