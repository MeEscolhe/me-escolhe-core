"use strict";

const {
  WorkExperience,
  valWorkExperience,
} = require("../models/work-experience");
const mongoose = require("mongoose");

const getAll = async () => {
  const workExperiences = await WorkExperience.find().sort("role");
  return workExperiences;
};

const getById = async (id) => {
  const workExperience = await WorkExperience.findById(
    mongoose.Types.ObjectId(id)
  );
  return workExperience;
};

const create = async ({ role, institution, durationInMonths }) => {
  let workExperience = new WorkExperience({
    role: role,
    institution: institution,
    durationInMonths: durationInMonths,
  });
  workExperience = await workExperience.save();
  return workExperience;
};

const update = async (id, { role, institution, durationInMonths }) => {
  const workExperience = await WorkExperience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      role: role,
      institution: institution,
      durationInMonths: durationInMonths
    },
    { new: true }
  );
  return workExperience;
};

const remove = async (id) => {
  const workExperience = await WorkExperience.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return workExperience;
};

const validate = (object) => {
  const { error } = valWorkExperience(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
