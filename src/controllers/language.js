"use strict";

const { Language, valLanguage } = require("../models/language");
const mongoose = require("mongoose");

const getAll = async () => {
  const languages = await Language.find().sort("name");
  return languages;
};

const getById = async (id) => {
  const language = await Language.findById(mongoose.Types.ObjectId(id));
  return language;
};

const create = async ({ name, level }) => {
  let language = new Language({
    name: name,
    level: level,
  });
  language = await language.save();
  return language;
};

const update = async (id, { name, level }) => {
  const language = await Language.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      level: level,
    },
    { new: true }
  );
  return language;
};

const remove = async (id) => {
  const language = await Language.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return language;
};

const validate = (object) => {
  const { error } = valLanguage(object);
  return error;
};

export { getAll, getById, create, update, remove, validate };
