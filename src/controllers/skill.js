"use strict";

const { Skill, validateSkill } = require("../models/skill");
const mongoose = require("mongoose");

/**
 * Get all skills
 * @returns {array} list of all skills
 */
const getAll = async () => await Skill.find().sort("name");

/**
 * Get skill by id
 * @param {string} id
 * @returns {object} skill
 */
const getById = async (id) => await Skill.findById(mongoose.Types.ObjectId(id));

/**
 * Create skill
 * @param {array} languages
 * @param {array} soft
 * @param {array} hard
 * @returns {object} skill created
 */
const create = async ({ languages, soft, hard }) => {
  const skill = new Skill({
    languages: languages,
    soft: soft,
    hard: hard,
  });
  return await skill.save();
};

/**
 * Update skill
 * @param {string} id
 * @param {array} languages
 * @param {array} soft
 * @param {array} hard
 * @returns {object} skill updated
 */
const update = async (id, { languages, soft, hard }) =>
  await Skill.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      languages: languages,
      soft: soft,
      hard: hard,
    },
    { new: true }
  );

/**
 * Remove skill by id
 * @param {string} id
 * @returns {object} skill removed
 */
const remove = async (id) =>
  await Skill.findByIdAndRemove(mongoose.Types.ObjectId(id));

/**
 * Validate skill
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateSkill(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
