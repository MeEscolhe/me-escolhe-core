"use strict";

const { Hard, valHard } = require("../models/hard");
const mongoose = require("mongoose");

const getAll = async () => {
  const hards = await Hard.find().sort("name");
  return hards;
};

const getById = async (id) => {
  const hard = await Hard.findById(mongoose.Types.ObjectId(id));
  return hard;
};

const create = async ({ name, level }) => {
  let hard = new Hard({
    name: name,
    level: level,
  });
  hard = await hard.save();
  return hard;
};

const update = async (id, { name, level }) => {
  const hard = await Hard.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      level: level,
    },
    { new: true }
  );
  return hard;
};

const remove = async (id) => {
  const hard = await Hard.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return hard;
};

const validate = (object) => {
  const { error } = valHard(object);
  return error;
};

export { getAll, getById, create, update, remove, validate };
