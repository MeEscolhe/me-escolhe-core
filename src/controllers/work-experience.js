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
const getAll = async () => {
  const workExperiences = await WorkExperience.find().sort("role");
  return workExperiences;
};

/**
 * Get work experience by id
 * @param {string} id
 * @returns {object} work experience
 */
const getById = async (id) => {
  const workExperience = await WorkExperience.findById(
    mongoose.Types.ObjectId(id)
  );
  return workExperience;
};

/**
 * Create work experience
 * @param {string} role
 * @param {string} institution
 * @param {number} durationInMonths
 * @returns {object} work experience created
 */
const create = async ({ role, institution, durationInMonths }) => {
  let workExperience = new WorkExperience({
    role: role,
    institution: institution,
    durationInMonths: durationInMonths,
  });
  workExperience = await workExperience.save();
  return workExperience;
};

/**
 * Update work experience
 * @param {string} id
 * @param {string} role
 * @param {string} institution
 * @param {number} durationInMonths
 * @returns {object} work experience updated
 */
const update = async (id, { role, institution, durationInMonths }) => {
  const workExperience = await WorkExperience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      role: role,
      institution: institution,
      durationInMonths: durationInMonths,
    },
    { new: true }
  );
  return workExperience;
};

/**
 * Remove work experience by id
 * @param {string} id
 * @returns {object} work experience removed
 */
const remove = async (id) => {
  const workExperience = await WorkExperience.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return workExperience;
};

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
