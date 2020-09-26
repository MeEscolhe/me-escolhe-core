"use strict";

const { Phase } = require("../models/phase");
const mongoose = require("mongoose");

const getAll = async () => {
  const Phase = await Phase.find().sort("name");
  return Phase;
};

const getById = async (id) => {
  const phase = await Phase.findById(mongoose.Types.ObjectId(id));
  return phase;
};

const create = async ({ students, selectionId }) => {
  let Phase = new Phase({
    students: students,
    selectionId: selectionId,
  });
  Phase = await Phase.save();
  return Phase;
};

const update = async (id, { students, selectionId }) => {
  const Phase = await Phase.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      students: students,
      selectionId: selectionId,
    },
    { new: true }
  );
  return Phase;
};

const remove = async (id) => {
  const Phase = await Phase.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return Phase;
};

const validate = (object) => {
  const { error } = valPhase(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
