"use strict";

const { Experience, validateExperience } = require("../models/experience");
const mongoose = require("mongoose");

/**
 * Get all experiences
 * @returns {array} list of all experiences
 */
const getAll = async () => {
  const experience = await Experience.find();
  return experience;
};

/**
 * Get experience by id
 * @param {string} id
 * @returns {object} experience
 */
const getById = async (id) => {
  const experience = await Experience.findById(mongoose.Types.ObjectId(id));
  return experience;
};

/**
 * Create experience
 * @param {array} academic
 * @param {array} work
 * @returns {object} experience created
 */
const create = async ({ academic, work }) => {
  let experience = new Experience({
    academic: academic,
    work: work,
  });
  experience = await experience.save();
  return experience;
};

/**
 * Update experience by id
 * @param {string} id
 * @param {array} academic
 * @param {array} work
 * @returns {object} experience updated
 */
const update = async (id, { academic, work }) => {
  const experience = await Experience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      academic: academic,
      work: work,
    },
    { new: true }
  );
  return experience;
};

/**
 * Remove experience by id
 * @param {string} id
 * @returns {object} experience removed
 */
const remove = async (id) => {
  const experience = await Experience.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return experience;
};

/**
 * Validate academic experience
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateExperience(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
