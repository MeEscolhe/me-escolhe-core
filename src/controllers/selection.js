"use strict";

const { Selection, validateSelection } = require("../models/selection");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const getAll = async ({ page, limit }) =>
  await Selection.paginate({}, { page, limit });

const getById = async (id) => await Selection.findById(id);

const create = async ({ role, description, phases, current, skills }) => {
  let selection = new Selection({
    role: role,
    description: description,
    phases: phases,
    current: current,
    skills: skills,
  });
  selection = await selection.save();
  return selection;
};

const update = async (id, updateData) => {
  const selection = await Selection.findByIdAndUpdate(
    ObjectId(id),
    updateData,
    { new: true }
  );
  return selection;
};

const remove = async (id) => await Selection.findByIdAndRemove(ObjectId(id));

const validate = (object) => {
  const { error } = validateSelection(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
