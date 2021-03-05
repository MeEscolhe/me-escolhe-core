"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

/**
 * Validate token by request
 * @param {Request} request
 * @param {Response} response
 * @param {Next} next
 */
const tokenValidator = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).send({ error: "No Token Provided" });

  const parts = authHeader.split(" ");
  if (!parts.length === 2)
    return response.status(401).send({ error: "Token Malformatted" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: "Token Malformatted" });

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return response.status(401).send({ error: "Token Invalid" });
    return next();
  });
};

/**
 * Generate token
 * @param {Object} params
 * @return {String} token
 */
const generateToken = (params = {}) => {
  // Validity: 7 days
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 604800,
  });
};

/**
 * Encrypt password
 * @param {string} password
 * @return {String} password encrypted
 */
const encryptPassword = (password) => {
  return bcrypt.hashSync(
    password,
    parseInt(process.env.BCRYPT_PASSWORD_ROUNDS)
  );
};

/**
 * Check password
 * @param {string} notEncryptedPassword
 * @param {string} encryptedPassword
 * @return {boolean} verification result
 */
const validatePassword = (notEncryptedPassword, encryptedPassword) => {
  return bcrypt.compareSync(notEncryptedPassword, encryptedPassword);
};

module.exports = {
  tokenValidator,
  generateToken,
  encryptPassword,
  validatePassword,
};
