const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { validate, arrayOfIds } = require("../middlewares/model-validator");

/**
 *  Skill model
 *  @typedef {{languages: array, soft: array, hard: array}} SkillSchema
 */
const SkillSchema = mongoose.model(
  "Skill",
  new mongoose.Schema({
    languages: {
      type: [ObjectId],
      ref: "LanguageSchema",
      required: true,
      default: [],
    },
    soft: {
      type: [ObjectId],
      ref: "SoftSchema",
      required: true,
      default: [],
    },
    hard: {
      type: [ObjectId],
      ref: "HardSchema",
      required: true,
      default: [],
    },
  })
);

/**
 * validade skill from request
 * @param {SkillSchema} skill
 */
const validateSkill = (skill) => {
  return validate(
    {
      languages: arrayOfIds(),
      soft: arrayOfIds(),
      hard: arrayOfIds(),
    },
    skill
  );
};

module.exports = {
  Skill: SkillSchema,
  validateSkill,
};
