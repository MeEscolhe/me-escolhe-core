"use strict";

const mongoose = require("mongoose");
const {
  validate,
  string,
  arrayOfIds,
  reference,
} = require("../middlewares/model-validator");

/**
 *  Teacher model
 *  @typedef {{name: string, email: string, description: string, labId: string, managements: array}} TeacherSchema
 */
const TeacherSchema = mongoose.model(
  "Teacher",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    labId: {
      type: String,
      required: true,
    },
    managements: {
      type: [String],
      required: true,
    },
  })
);

/**
 * Validade teacher from request
 * @param {TeacherSchema} teacher
 */
const validateTeacher = (teacher) =>
  validate(
    {
      name: string(),
      email: string(),
      description: string(),
      labId: reference(),
      managements: arrayOfIds(),
    },
    teacher
  );

module.exports = {
  Teacher: TeacherSchema,
  validateTeacher,
};
