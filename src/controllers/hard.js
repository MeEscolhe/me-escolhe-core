"use strict";

const { Hard, validateHard } = require("../models/hard");
const mongoose = require("mongoose");

/**
 * Get all hard skills
 * @returns {array} list of all hard skills
 */
const getAll = async () => await Hard.find().sort("name");

/**
 * Get hard skill by id
 * @param {string} id
 * @returns {object} hard skill
 */
const getById = async (id) => await Hard.findById(mongoose.Types.ObjectId(id));

/**
 * Create hard skill
 * @param {string} name
 * @param {number} level
 * @returns {object} hard skill created
 */
const create = async ({ name, level }) => {
  const hard = new Hard({
    name: name,
    level: level,
  });
  return await hard.save();
};

/**
 * Update hard skill by id
 * @param {string} id
 * @param {string} name
 * @param {number} level
 * @returns {object} hard skill updated
 */
const update = async (id, { name, level }) =>
  await Hard.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      level: level,
    },
    { new: true }
  );

/**
 * Remove hard skill by id
 * @param {string} id
 * @returns {object} hard skill removed
 */
const remove = async (id) =>
  await Hard.findByIdAndRemove(mongoose.Types.ObjectId(id));

/**
 * Validate hard skill
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateHard(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
