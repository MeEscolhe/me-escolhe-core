"use strict";

const { Teacher, validateTeacher } = require("../models/teacher");
const mongoose = require("mongoose");

/**
 * Get all teachers
 * @returns {array} list of all teachers
 */
const getAll = async () => {
  const teachers = await Teacher.find().sort("name");
  return teachers;
};

/**
 * Get teacher by id
 * @param {string} id
 * @returns {object} teacher
 */
const getById = async (id) =>
  await Teacher.findById(mongoose.Types.ObjectId(id));

/**
 * Create student
 * @param {string} name
 * @param {string} email
 * @param {string} description
 * @param {string} labId
 * @param {array} managements
 * @returns {object} teacher created
 */
const create = async ({ name, email, description, labId, managements }) => {
  let teacher = new Teacher({
    name: name,
    email: email,
    description: description,
    labId: labId,
    managements: managements,
  });
  teacher = await teacher.save();
  return teacher;
};

/**
 * Update student
 * @param {string} id
 * @param {string} name
 * @param {string} email
 * @param {string} description
 * @param {string} labId
 * @param {array} managements
 * @returns {object} teacher updated
 */
const update = async (id, { name, email, description, labId, managements }) => {
  const teacher = await Teacher.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      email: email,
      description: description,
      labId: labId,
      managements: managements,
    },
    { new: true }
  );
  return teacher;
};

/**
 * Remove teacher by id
 * @param {string} id
 * @returns {object} teacher removed
 */
const remove = async (id) => {
  const teacher = await Teacher.findByIdAndRemove(mongoose.Types.ObjectId(id));
  return teacher;
};

/**
 * Validate teacher
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateTeacher(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
