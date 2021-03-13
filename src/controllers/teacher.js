"use strict";

const { Teacher, validateTeacher } = require("../models/teacher");
const MongoDb = require("../middlewares/mongodb-middleware");
const mongoose = require("mongoose");
const {
  DefaultArray,
  DefaultString,
} = require("../providers/default-values-provider");

/**
 * Get all teachers
 * @returns {array} list of all teachers
 */
const getAll = async () => await MongoDb.getAll(Teacher, "name");

/**
 * Get teacher by id
 * @param {string} id
 * @returns {object} teacher
 */
const getById = async (id) => await MongoDb.getById(Teacher, id);

/**
 * Get teacher by email
 * @param {string} email
 * @returns {object} teacher
 */
const getByEmail = async (email) => await MongoDb.getByEmail(Teacher, email);

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
  description = DefaultString,
  labId,
  managements = DefaultArray,
}) =>
  await MongoDb.create(Teacher, {
    name,
    email,
    description,
    labId,
    managements,
  });

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
  {
    name,
    email,
    description = DefaultString,
    labId,
    managements = DefaultArray,
  }
) =>
  await MongoDb.updateById(Teacher, id, {
    name,
    email,
    description,
    labId,
    managements,
  });

/**
 * Remove teacher by id
 * @param {string} id
 * @returns {object} teacher removed
 */
const remove = async (id) => await MongoDb.removeById(Teacher, id);

//Teacher.findByIdAndRemove(mongoose.Types.ObjectId(id));

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
