"use strict";

const {
  AcademicExperience,
  validateAcademicExperience,
} = require("../models/academic-experience");
const mongoose = require("mongoose");

/**
 * Get all academic experiences
 * @returns {array} list of all academic experiences
 */
const getAll = async () => {
  const academicExperiences = await AcademicExperience.find().sort("title");
  return academicExperiences;
};

/**
 * Get academic experience by id
 * @param {string} id
 * @returns {object} academic experience
 */
const getById = async (id) => {
  const academicExperience = await AcademicExperience.findById(
    mongoose.Types.ObjectId(id)
  );
  return academicExperience;
};

/**
 * Create academic experience
 * @param {string} title
 * @param {string} category
 * @param {string} institution
 * @returns {object} academic experience created
 */
const create = async ({ title, category, institution }) => {
  let academicExperience = new AcademicExperience({
    title: title,
    category: category,
    institution: institution,
  });
  academicExperience = await academicExperience.save();
  return academicExperience;
};

/**
 * Update academic experience by id
 * @param {string} id
 * @param {string} title
 * @param {string} category
 * @param {string} institution
 * @returns {object} academic experience updated
 */
const update = async (id, { title, category, institution }) => {
  const academicExperience = await AcademicExperience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      title: title,
      category: category,
      institution: institution,
    },
    { new: true }
  );
  return academicExperience;
};

/**
 * Remove academic experience by id
 * @param {string} id
 * @returns {object} academic experience removed
 */
const remove = async (id) => {
  const academicExperience = await AcademicExperience.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return academicExperience;
};

/**
 * Validate academic experience
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateAcademicExperience(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
