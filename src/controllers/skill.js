const { Skill } = require("../models/skill");
const mongoose = require("mongoose");

const getAll = async () => {
  const skills = await Skill.find().sort("name");
  return skills;
};

const getById = async (id) => {
  const skill = await Skill.findById(mongoose.Types.ObjectId(id));
  return skill;
};

const create = async ({ languages, soft, hard }) => {
  let skill = new Skill({
    languages: languages,
    soft: soft,
    hard: hard,
  });
  skill = await skill.save();
  return skill;
};

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

const remove = async (id) => {
  const skill = await Skill.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return skill;
};

const validate = (object) => {
  const { error } = valSkill(object);
  return error;
};

export { getAll, getById, create, update, remove, validate };
