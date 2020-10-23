"use strict";

const { Language, validateLanguage } = require("../models/language");
const mongoose = require("mongoose");

/**
 * Get all languages
 * @returns {array} list of all languages
 */
const getAll = async () => {
  const languages = await Language.find().sort("name");
  return languages;
};

/**
 * Get language by id
 * @param {string} id
 * @returns {object} language
 */
const getById = async (id) => {
  const language = await Language.findById(mongoose.Types.ObjectId(id));
  return language;
};

/**
 * Create language
 * @param {string} name
 * @param {number} level
 * @returns {object} language created
 */
const create = async ({ name, level }) => {
  let language = new Language({
    name: name,
    level: level,
  });
  language = await language.save();
  return language;
};

/**
 * Update language by id
 * @param {string} id
 * @param {string} name
 * @param {number} level
 * @returns {object} language updated
 */
const update = async (id, { name, level }) => {
  const language = await Language.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      level: level,
    },
    { new: true }
  );
  return language;
};

/**
 * Remove language by id
 * @param {string} id
 * @returns {object} lab removed
 */
const remove = async (id) => {
  const language = await Language.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return language;
};

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
