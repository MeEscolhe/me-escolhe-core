"use strict";

const { Hard, validateHard } = require("../models/hard");
const mongoose = require("mongoose");

/**
 * Get all hard skills
 * @returns {array} list of all hard skills
 */
const getAll = async () => {
  const hards = await Hard.find().sort("name");
  return hards;
};

/**
 * Get hard skill by id
 * @param {string} id
 * @returns {object} hard skill
 */
const getById = async (id) => {
  const hard = await Hard.findById(mongoose.Types.ObjectId(id));
  return hard;
};

/**
 * Create hard skill
 * @param {string} name
 * @param {number} level
 * @returns {object} hard skill created
 */
const create = async ({ name, level }) => {
  let hard = new Hard({
    name: name,
    level: level,
  });
  hard = await hard.save();
  return hard;
};

/**
 * Update hard skill by id
 * @param {string} id
 * @param {string} name
 * @param {number} level
 * @returns {object} hard skill updated
 */
const update = async (id, { name, level }) => {
  const hard = await Hard.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      level: level,
    },
    { new: true }
  );
  return hard;
};

/**
 * Remove hard skill by id
 * @param {string} id
 * @returns {object} hard skill removed
 */
const remove = async (id) => {
  const hard = await Hard.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return hard;
};

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
