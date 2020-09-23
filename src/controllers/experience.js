"use strict";

const { Experience } = require("../models/experience");
const mongoose = require("mongoose");

const getAll = () => {
  const experiences = await Experience.find();
  return experiences;
};

const getById = (id) => {
  const experience = await Experience.findById(
    mongoose.Types.ObjectId(id)
  );
  return experience;
};

const create = ({academic, work}) => {
  let experience = new Experience({
    academic: academic,
    work: work,
  });
  experience = await experience.save();
  return experience;
};

const update = (id, {academic, work}) => {
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

const remove = (id) => {
  const experience = await Experience.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return experience;
};

export {getAll, getById, create, update, remove};