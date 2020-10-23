"use strict";

const { Skill, validateSkill } = require("../models/skill");
const mongoose = require("mongoose");

/**
 * Get all skills
 * @returns {array} list of all skills
 */
const getAll = async () => {
  const skills = await Skill.find().sort("name");
  return skills;
};

/**
 * Get skill by id
 * @param {string} id
 * @returns {object} skill
 */
const getById = async (id) => {
  const skill = await Skill.findById(mongoose.Types.ObjectId(id));
  return skill;
};

/**
 * Create skill
 * @param {array} languages
 * @param {array} soft
 * @param {array} hard
 * @returns {object} skill created
 */
const create = async ({ languages, soft, hard }) => {
  let skill = new Skill({
    languages: languages,
    soft: soft,
    hard: hard,
  });
  skill = await skill.save();
  return skill;
};

/**
 * Update skill
 * @param {string} id
 * @param {array} languages
 * @param {array} soft
 * @param {array} hard
 * @returns {object} skill updated
 */
const update = async (id, { languages, soft, hard }) => {
  const skill = await Skill.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      languages: languages,
      soft: soft,
      hard: hard,
    },
    { new: true }
  );
  return skill;
};

/**
 * Remove skill by id
 * @param {string} id
 * @returns {object} skill removed
 */
const remove = async (id) => {
  const skill = await Skill.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return skill;
};

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
