"use strict";

const { Lab, validateLab } = require("../models/lab");
const mongoose = require("mongoose");

/**
 * Get all labs
 * @returns {array} list of all labs
 */
const getAll = async () => {
  const labs = await Lab.find().sort("name");
  return labs;
};

/**
 * Get lab by id
 * @param {string} id
 * @returns {object} lab
 */
const getById = async (id) => {
  const lab = await Lab.findById(mongoose.Types.ObjectId(id));
  return lab;
};

/**
 * Create lab
 * @param {string} name
 * @param {string} description
 * @returns {object} lab created
 */
const create = async ({ name, description }) => {
  let lab = new Lab({
    name: name,
    description: description,
  });
  lab = await lab.save();
  return lab;
};

/**
 * Update lab by id
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @returns {object} lab updated
 */
const update = async (id, { name, description }) => {
  const lab = await Lab.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      description: description,
    },
    { new: true }
  );
  return lab;
};

/**
 * Remove lab by id
 * @param {string} id
 * @returns {object} lab removed
 */
const remove = async (id) => {
  const lab = await Lab.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return lab;
};

/**
 * Validate hard skill
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateLab(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
