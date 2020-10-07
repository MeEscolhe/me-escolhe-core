"use strict";

const { Phase, valPhase } = require("../models/phase");
const mongoose = require("mongoose");

const getAll = async () => {
  const Phase = await Phase.find().sort("name");
  return Phase;
};

const getById = async (id) => {
  const phase = await Phase.findById(mongoose.Types.ObjectId(id));
  return phase;
};

const create = async ({ students, selectionId, description }) => {
  let phase = new Phase({
    students: students,
    selectionId: selectionId,
    description: description,
  });
  phase = await phase.save();
  return phase;
};

const update = async (id, { students, selectionId, description }) => {
  const Phase = await Phase.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      students: students,
      selectionId: selectionId,
      description: description,
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
