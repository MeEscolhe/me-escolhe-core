"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const {
  validate,
  string,
  id,
  arrayOfIds,
  foreingKey,
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
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    labId: foreingKey("Lab", "_id", ObjectId),
    managements: foreingKey("Project", "_id", ObjectId, true),
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
      password: string(),
      description: string(),
      labId: id(),
      managements: arrayOfIds(),
    },
    teacher
  );

module.exports = {
  Teacher: TeacherSchema,
  validateTeacher,
};
