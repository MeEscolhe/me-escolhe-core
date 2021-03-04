"use strict";

const mongoose = require("mongoose");
const { validate, string, boolean } = require("../middlewares/model-validator");

/**
 *  Credential model
 *  @typedef {{email: string, password: string, isTeacher: boolean}} CredentialSchema
 */
const CredentialSchema = mongoose.model(
  "Credential",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isTeacher: {
      type: Boolean,
      required: true,
      default: false,
    },
  })
);

/**
 * Validate credential from request
 * @param {CredentialSchema} credential
 */
const validateCredential = (credential) =>
  validate(
    {
      email: string(),
      password: string(),
      isTeacher: boolean(),
    },
    credential
  );

module.exports = {
  Credential: CredentialSchema,
  validateCredential: validateCredential,
};
