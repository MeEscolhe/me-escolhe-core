"use strict";

const { Teacher, valTeacher } = require("../models/teacher");
const mongoose = require("mongoose");

const getAll = async () => {
  const teachers = await Teacher.find().sort("name");
  return teachers;
};

const getById = async (id) =>
  await Teacher.findById(mongoose.Types.ObjectId(id));

const create = async ({
  name,
  email,
  description,
  labId,
  managements,
  feedbackRequests,
}) => {
  let teacher = new Teacher({
    name: name,
    email: email,
    description: description,
    labId: labId,
    managements: managements,
    feedbackRequests: feedbackRequests,
  });
  teacher = await teacher.save();
  return teacher;
};

const update = async (
  id,
  { name, email, description, labId, managements, feedbackRequests }
) => {
  const teacher = await Teacher.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      email: email,
      description: description,
      labId: labId,
      managements: managements,
      feedbackRequests: feedbackRequests,
    },
    { new: true }
  );
  return teacher;
};

const remove = async (id) => {
  const teacher = await Teacher.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return teacher;
};
const validate = (object) => {
  const { error } = valTeacher(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
