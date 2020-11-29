"use strict";

const { Teacher, validateTeacher } = require("../models/teacher");
const mongoose = require("mongoose");

/**
 * Get all teachers
 * @returns {array} list of all teachers
 */
const getAll = async () => await Teacher.find().sort("name");

/**
 * Get teacher by id
 * @param {string} id
 * @returns {object} teacher
 */
const getById = async (id) =>
  await Teacher.findById(mongoose.Types.ObjectId(id));

/**
 * Get teacher by email
 * @param {string} email
 * @returns {object} teacher
 */
const getByEmail = async (email) => await Teacher.findOne({ email });

/**
 * Create student
 * @param {string} name
 * @param {string} email
 * @param {string} description
 * @param {string} labId
 * @param {array} managements
 * @returns {object} teacher created
 */
const create = async ({
  name,
  email,
  password,
  description,
  labId,
  managements,
}) => {
  const teacher = new Teacher({
    name: name,
    email: email,
    password: password,
    description: description,
    labId: labId,
    managements: managements,
  });
  return await teacher.save();
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
const update = async (
  id,
  { name, email, description, labId, managements },
  runValidators = true
) =>
  await Teacher.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      name: name,
      email: email,
      description: description,
      labId: labId,
      managements: managements,
    },
    { new: true, runValidators: runValidators }
  );

/**
 * Remove teacher by id
 * @param {string} id
 * @returns {object} teacher removed
 */
const remove = async (id) =>
  await Teacher.findByIdAndRemove(mongoose.Types.ObjectId(id));

/**
 * Validate teacher
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateTeacher(object);
  return error;
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  remove,
  validate,
};
