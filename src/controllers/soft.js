"use strict";

const { Soft, validateSoft } = require("../models/soft");
const mongoose = require("mongoose");

/**
 * Get all soft skills
 * @returns {array} list of all soft skills
 */
const getAll = async () => await Soft.find().sort("name");

/**
 * Get soft skill by id
 * @param {string} id
 * @returns {object} soft skill
 */
const getById = async (id) => await Soft.findById(mongoose.Types.ObjectId(id));

/**
 * Create soft skill
 * @param {string} name
 * @returns {object} soft skill created
 */
const create = async ({ name }) => {
  const soft = new Soft({
    name: name,
  });
  return await soft.save();
};

/**
 * Update soft skill by id
 * @param {string} id
 * @param {string} name
 * @returns {object} soft skill updated
 */
const update = async (id, { name }) =>
  await Soft.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
    },
    { new: true }
  );

/**
 * Remove soft skill by id
 * @param {string} id
 * @returns {object} soft skill removed
 */
const remove = async (id) =>
  await Soft.findByIdAndRemove(mongoose.Types.ObjectId(id));

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
