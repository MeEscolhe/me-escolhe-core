const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

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

function validateSkill(skill) {
  const SkillSchema = Joi.object().keys({
    languages: Joi.array().items(Joi.string()).min(0),
    soft: Joi.array().items(Joi.string()).min(0),
    hard: Joi.array().items(Joi.string()).min(0),
  });

  return SkillSchema.validate(skill.body);
}

exports.Skill = SkillSchema;
