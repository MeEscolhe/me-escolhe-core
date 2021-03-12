"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const { Credential, validateCredential } = require("../models/credential");
const {
  encryptPassword,
  validatePassword,
} = require("../middlewares/auth-middleware");
const MongoDb = require("../middlewares/mongodb-middleware");

const TeacherController = require("./teacher");
const StudentController = require("./student");
const { generateToken } = require("../middlewares/auth-middleware");

/**
 * Get all credentials
 * @returns {array} list of all labs
 */
const getAll = async () => await MongoDb.getAll(Credential, "email");

/**
 * Get lab by id
 * @param {string} email
 * @returns {object} lab
 */
const getByEmail = async (email) => await MongoDb.getByEmail(Credential, email);

/**
 * Create lab
 * @param {string} email
 * @param {string} password
 * @param {boolean} isTeacher
 * @returns {object} credential created
 */
const create = async ({ email, password }, isTeacher) =>
  await MongoDb.create(Credential, {
    email,
    password: encryptPassword(password),
    isTeacher,
  });

/**
 * Update credential
 * @param {string} email
 * @param {string} password
 * @param {boolean} isTeacher
 * @returns {object} credential updated
 */
const update = async ({ email, password, isTeacher }, runValidators = true) =>
  await MongoDb.updateByEmail(
    Credential,
    email,
    {
      email,
      password,
      isTeacher,
    },
    runValidators
  );

/**
 * Remove credential by email
 * @param {string} email
 * @returns {object} lab removed
 */
const remove = async (email) => await MongoDb.getByEmail(Credential, email);

/**
 * Authenticate login
 * @param {string} email
 * @param {string} password
 * @returns {object} authorization
 */
const authenticate = async ({ email, password }) => {
  const credential = await getByEmail(email);
  if (!credential) return credential;
  if (!validatePassword(password, credential.password)) return credential;
  return {
    user: credential.isTeacher
      ? await TeacherController.getByEmail(email)
      : await StudentController.getByEmail(email),
    token: generateToken(credential),
    isTeacher: credential.isTeacher,
  };
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

module.exports = {
  getAll,
  getByEmail,
  create,
  update,
  remove,
  authenticate,
  validate,
};
