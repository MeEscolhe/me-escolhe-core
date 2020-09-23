"use strict";

const {AcademicExperience, valAcademicExperience} = require("../models/academic-experience");
const mongoose = require("mongoose");

const getAll = () =>{
  const academicExperiences = await AcademicExperience.find().sort("title");
  return academicExperiences;
};

const getById = (id) => {
  const academicExperience = await AcademicExperience.findById(
    mongoose.Types.ObjectId(req.params.id)
  );
  return academicExperience;
};

const create = ({title, category, institution}) => {
  let academicExperience = new AcademicExperience({
    title: title,
    category: category,
    institution: institution,
  });
  academicExperience = await academicExperience.save();
  return academicExperience;
};

const update = (id, {title, category, institution}) => {
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

const remove = (id) => {
  const academicExperience = await AcademicExperience.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id)
  );
  return academicExperience;
};

const validate = (object) => {
  const { error } = valAcademicExperience(object);
  return error;
}

export {getAll, getById, create, update, remove, validate};
