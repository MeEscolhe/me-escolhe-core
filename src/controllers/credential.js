"use strict";

const { Credential, validateCredential } = require("../models/credential");
const { encryptPassword } = require("../middlewares/auth-middleware");
const mongoose = require("mongoose");

/**
 * Get all credentials
 * @returns {array} list of all labs
 */
const getAll = async () => await Credential.find().sort("email");

/**
 * Get lab by id
 * @param {string} email
 * @returns {object} lab
 */
const getByEmail = async (email) => await Credential.findOne({ email });

/**
 * Create lab
 * @param {string} email
 * @param {string} password
 * @param {boolean} isTeacher
 * @returns {object} credential created
 */
const create = async ({ email, password }, isTeacher) => {
  password = encryptPassword(password);
  const credential = new Credential({
    email,
    password,
    isTeacher,
  });
  return await credential.save();
};

/**
 * Update credential
 * @param {string} email
 * @param {string} password
 * @param {boolean} isTeacher
 * @returns {object} credential updated
 */
const update = async ({ email, password, isTeacher }, runValidators = true) => {
  const oldCredential = await getByEmail(email);
  await Credential.findByIdAndUpdate(
    mongoose.Types.ObjectId(oldCredential._id),
    {
      email,
      password,
      isTeacher,
    },
    { new: true, runValidators: runValidators }
  );
};

/**
 * Remove credential by email
 * @param {string} email
 * @returns {object} lab removed
 */
const remove = async (email) => {
  return Credential.findOneAndDelete({ email });
};

/**
 * Validate hard skill
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateCredential(object);
  return error;
};

module.exports = { getAll, getByEmail, create, update, remove, validate };
