"use strict";

const { Soft, validateSoft } = require("../models/soft");
const mongoose = require("mongoose");

/**
 * Get all soft skills
 * @returns {array} list of all soft skills
 */
const getAll = async () => {
  const softs = await Soft.find().sort("name");
  return softs;
};

/**
 * Get soft skill by id
 * @param {string} id
 * @returns {object} soft skill
 */
const getById = async (id) => {
  const soft = await Soft.findById(mongoose.Types.ObjectId(id));
  return soft;
};

/**
 * Create soft skill
 * @param {string} name
 * @returns {object} soft skill created
 */
const create = async ({ name }) => {
  let soft = new Soft({
    name: name,
  });
  soft = await soft.save();
  return soft;
};

/**
 * Update soft skill by id
 * @param {string} id
 * @param {string} name
 * @returns {object} soft skill updated
 */
const update = async (id, { name }) => {
  const soft = await Soft.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
    },
    { new: true }
  );
  return soft;
};

/**
 * Remove soft skill by id
 * @param {string} id
 * @returns {object} soft skill removed
 */
const remove = async (id) => {
  const soft = await Soft.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return soft;
};

/**
 * Validate soft skill
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateSoft(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
