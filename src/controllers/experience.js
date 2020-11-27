"use strict";

const { Experience, validateExperience } = require("../models/experience");
const academicExperienceController = require("../controllers/academic-experience");
const workExperienceController = require("../controllers/work-experience");
const mongoose = require("mongoose");

/**
 * Get all experiences
 * @returns {array} list of all experiences
 */
const getAll = async () => await Experience.find();

/**
 * Get all experiences by list id
 * @returns {array} list of ids
 * @returns {array} list of experiences
 */
const getAllByListId = async (list_id) => {
  let experiences = [];
  for (let i = 0; i < list_id.length; i++) {
    experiences[i] = await getById(list_id[i]);
  }
  return experiences;
};

/**
 * Get experience by id
 * @param {string} id
 * @returns {object} experience
 */
const getById = async (id) => {
  let experience = await Experience.findById(mongoose.Types.ObjectId(id));
  experience = { ...experience._doc };
  experience.academic = await academicExperienceController.getAllByListId(
    experience.academic
  );
  experience.work = await workExperienceController.getAllByListId(
    experience.work
  );
  return experience;
};

/**
 * Create experience
 * @param {array} academic
 * @param {array} work
 * @returns {object} experience created
 */
const create = async ({ academic, work }) => {
  const experience = new Experience({
    academic: academic,
    work: work,
  });
  return await experience.save();
};

/**
 * Update experience by id
 * @param {string} id
 * @param {array} academic
 * @param {array} work
 * @returns {object} experience updated
 */
const update = async (id, { academic, work }) =>
  await Experience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      academic: academic,
      work: work,
    },
    { new: true }
  );

/**
 * Remove experience by id
 * @param {string} id
 * @returns {object} experience removed
 */
const remove = async (id) =>
  await Experience.findByIdAndRemove(mongoose.Types.ObjectId(id));

/**
 * Validate academic experience
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateExperience(object);
  return error;
};

module.exports = {
  getAll,
  getById,
  getAllByListId,
  create,
  update,
  remove,
  validate,
};
