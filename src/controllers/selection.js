"use strict";

const { Selection, valSelection } = require("../models/selection");
const mongoose = require("mongoose");

const getAll = async ({ page, limit }) =>
  await Selection.paginate({}, { page, limit });

const getById = async (id) =>
  await Selection.findById(mongoose.Types.ObjectId(id));

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

const update = async (id, updateData) => {
  const selection = await Selection.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    updateData,
    { new: true }
  );
  return selection;
};

const remove = async (id) =>
  await Selection.findByIdAndRemove(mongoose.Types.ObjectId(id));

const validate = (object) => {
  const { error } = valSelection(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
