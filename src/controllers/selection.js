"use strict";

const { Selection } = require("../models/selection");
const mongoose = require("mongoose");

const getAll = async () => {
  const selections = await Selection.find().sort("role");
  return selections;
};

const getById = async (id) => {
  const selection = await Selection.findById(mongoose.Types.ObjectId(id));
  return selection;
};

const create = async ({ role, description, phases, current }) => {
  let selection = new Selection({
    role: role,
    description: description,
    phases: phases,
    current: current,
  });
  selection = await selection.save();
  return selection;
};

const update = async (id, { role, description, phases, current }) => {
  const selection = await Selection.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      role: role,
      description: description,
      phases: phases,
      current: current,
    },
    { new: true }
  );
  return selection;
};

const remove = async (id) => {
  const selection = await Selection.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return selection;
};

const validate = (object) => {
  const { error } = valSelection(object);
  return error;
};

export { getAll, getById, create, update, remove, validate };
