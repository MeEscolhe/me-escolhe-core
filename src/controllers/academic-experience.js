"use strict";

const {
  AcademicExperience,
  valAcademicExperience,
} = require("../models/academic-experience");
const mongoose = require("mongoose");

const getAll = async () => {
  const academicExperiences = await AcademicExperience.find().sort("title");
  return academicExperiences;
};

const getById = async (id) => {
  const academicExperience = await AcademicExperience.findById(
    mongoose.Types.ObjectId(id)
  );
  return academicExperience;
};

const create = async ({ title, category, institution }) => {
  let academicExperience = new AcademicExperience({
    title: title,
    category: category,
    institution: institution,
  });
  academicExperience = await academicExperience.save();
  return academicExperience;
};

const update = async (id, { title, category, institution }) => {
  const academicExperience = await AcademicExperience.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      title: title,
      category: category,
      institution: institution,
    },
    { new: true }
  );
  return academicExperience;
};

const remove = async (id) => {
  const academicExperience = await AcademicExperience.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return academicExperience;
};

const validate = (object) => {
  const { error } = valAcademicExperience(object);
  return error;
};

export { getAll, getById, create, update, remove, validate };
