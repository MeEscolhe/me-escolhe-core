"use strict";

const { Experience } = require("../models/experience");
const mongoose = require("mongoose");

const getAll = async () => {
  const experience = await Experience.find();
  return experience;
};

const getById = async (id) => {
  const experience = await Experience.findById(mongoose.Types.ObjectId(id));
  return experience;
};

const create = async ({ academic, work }) => {
  let experience = new Experience({
    academic: academic,
    work: work,
  });
  experience = await experience.save();
  return experience;
};

const update = async (id, { academic, work }) => {
  const experience = await Experience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      academic: academic,
      work: work,
    },
    { new: true }
  );
  return experience;
};

const remove = async (id) => {
  const experience = await Experience.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return experience;
};

module.exports = { getAll, getById, create, update, remove };
