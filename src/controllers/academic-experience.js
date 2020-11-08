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
const getAll = async () => await AcademicExperience.find().sort("title");

/**
 * Get academic experience by id
 * @param {string} id
 * @returns {object} academic experience
 */
const getById = async (id) =>
  await AcademicExperience.findById(mongoose.Types.ObjectId(id));

/**
 * Create academic experience
 * @param {string} title
 * @param {string} category
 * @param {string} institution
 * @param {string} initialDate date in string format
 * @param {string} finalDate date in string format
 * @returns {object} academic experience created
 */
const create = async ({
  title,
  category,
  institution,
  initialDate,
  finalDate,
}) => {
  let academicExperience = new AcademicExperience({
    title: title,
    category: category,
    institution: institution,
    initialDate: initialDate,
    finalDate: finalDate,
  });
  return await academicExperience.save();
};

/**
 * Update academic experience by id
 * @param {string} id
 * @param {string} title
 * @param {string} category
 * @param {string} institution
 * @param {string} initialDate date in string format
 * @param {string} finalDate date in string format
 * @returns {object} academic experience updated
 */
const update = async (
  id,
  { title, category, institution, initialDate, finalDate }
) =>
  await AcademicExperience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      title: title,
      category: category,
      institution: institution,
      initialDate: initialDate,
      finalDate: finalDate,
    },
    { new: true }
  );

/**
 * Remove academic experience by id
 * @param {string} id
 * @returns {object} academic experience removed
 */
const remove = async (id) =>
  await AcademicExperience.findByIdAndRemove(mongoose.Types.ObjectId(id));

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
