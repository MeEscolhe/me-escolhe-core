"use strict";

const { Project } = require("../models/project");
const mongoose = require("mongoose");

const getAll = async () => {
  const projects = await Project.find().sort("name");
  return projects;
};

const getById = async (id) => {
  const project = await Project.findById(mongoose.Types.ObjectId(id));
  return project;
};

const create = async ({ name, description, selections }) => {
  let project = new Project({
    name: name,
    description: description,
    selections: selections,
  });
  project = await project.save();
  return project;
};

const update = async (id, { name, description, selections }) => {
  const project = await Project.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      description: description,
      selections: selections,
    },
    { new: true }
  );
  return project;
};

const remove = async (id) => {
  const project = await Project.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return project;
};

const validate = async (object) => {
  const { error } = valProject(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
