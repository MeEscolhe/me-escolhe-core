"use strict";

const { Lab, validateLab } = require("../models/lab");
const mongoose = require("mongoose");

const getAll = async () => {
  const labs = await Lab.find().sort("name");
  return labs;
};

const getById = async (id) => {
  const lab = await Lab.findById(mongoose.Types.ObjectId(id));
  return lab;
};

const create = async ({ name, description }) => {
  let lab = new Lab({
    name: name,
    description: description,
  });
  lab = await lab.save();
  return lab;
};

const update = async (id, { name, description }) => {
  const lab = await Lab.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      description: description,
    },
    { new: true }
  );
  return lab;
};

const remove = async (id) => {
  const lab = await Lab.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return lab;
};

const validate = (object) => {
  const { error } = validateLab(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
