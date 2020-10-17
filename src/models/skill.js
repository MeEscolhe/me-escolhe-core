const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const Joi = require("joi");

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

function valSkill(skill) {
  const SkillSchema = Joi.object().keys({
    languages: Joi.array().items(Joi.string()).min(0).required(),
    soft: Joi.array().items(Joi.string()).min(0).required(),
    hard: Joi.array().items(Joi.string()).min(0).required(),
  });
  return SkillSchema.validate(skill);
}

module.exports = {
  Skill: SkillSchema,
  valSkill,
};
