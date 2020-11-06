"use strict";

const {
  WorkExperience,
  validateWorkExperience,
} = require("../models/work-experience");
const mongoose = require("mongoose");

/**
 * Get all work experiences
 * @returns {array} list of all work experiences
 */
const getAll = async () => await WorkExperience.find().sort("role");

/**
 * Get work experience by id
 * @param {string} id
 * @returns {object} work experience
 */
const getById = async (id) =>
  await WorkExperience.findById(mongoose.Types.ObjectId(id));

/**
 * Create work experience
 * @param {string} role
 * @param {string} institution
 * @param {number} durationInMonths
 * @param {string} initialDate date in string format
 * @param {string} finalDate date in string format
 * @returns {object} work experience created
 */
const create = async ({ role, institution, initialDate, finalDate }) => {
  let workExperience = new WorkExperience({
    role: role,
    institution: institution,
    initialDate: initialDate,
    finalDate: finalDate,
  });
  return await workExperience.save();
};

/**
 * Update work experience
 * @param {string} id
 * @param {string} role
 * @param {string} institution
 * @param {string} initialDate date in string format
 * @param {string} finalDate date in string format
 * @returns {object} work experience updated
 */
const update = async (id, { role, institution, initialDate, finalDate }) =>
  await WorkExperience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      role: role,
      institution: institution,
      initialDate: initialDate,
      finalDate: finalDate,
    },
    { new: true }
  );

/**
 * Remove work experience by id
 * @param {string} id
 * @returns {object} work experience removed
 */
const remove = async (id) =>
  await WorkExperience.findByIdAndRemove(mongoose.Types.ObjectId(id));

/**
 * Validate work experience
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateWorkExperience(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
