"use strict";

const { Soft, validateSoft } = require("../models/soft");
const mongoose = require("mongoose");

const getAll = async () => {
  const softs = await Soft.find().sort("name");
  return softs;
};

const getById = async (id) => {
  const soft = await Soft.findById(mongoose.Types.ObjectId(id));
  return soft;
};

const create = async ({ name }) => {
  let soft = new Soft({
    name: name,
  });
  soft = await soft.save();
  return soft;
};

const update = async (id, { name }) => {
  const soft = await Soft.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
    },
    { new: true }
  );
  return soft;
};

const remove = async (id) => {
  const soft = await Soft.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return soft;
};

const validate = (object) => {
  const { error } = validateSoft(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
