"use strict";

const { Language, validateLanguage } = require("../models/language");
const mongoose = require("mongoose");

/**
 * Get all languages
 * @returns {array} list of all languages
 */
const getAll = async () => await Language.find().sort("name");

/**
 * Get language by id
 * @param {string} id
 * @returns {object} language
 */
const getById = async (id) =>
  await Language.findById(mongoose.Types.ObjectId(id));

/**
 * Create language
 * @param {string} name
 * @param {number} level
 * @returns {object} language created
 */
const create = async ({ name, level }) => {
  const language = new Language({
    name: name,
    level: level,
  });
  return await language.save();
};

/**
 * Update language by id
 * @param {string} id
 * @param {string} name
 * @param {number} level
 * @returns {object} language updated
 */
const update = async (id, { name, level }) =>
  await Language.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      level: level,
    },
    { new: true }
  );

/**
 * Remove language by id
 * @param {string} id
 * @returns {object} lab removed
 */
const remove = async (id) =>
  await Language.findByIdAndRemove(mongoose.Types.ObjectId(id));

/**
 * Validate language
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateLanguage(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
