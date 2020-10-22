"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const {
  validate,
  string,
  id,
  arrayOfIds,
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
    },
    description: {
      type: String,
      default: "",
    },
    labId: {
      type: ObjectId,
      ref: "LabSchema",
    },
    managements: {
      type: [ObjectId],
      ref: "ProjectSchema",
      default: [],
    },
  })
);

/**
 * Validade teacher from request
 * @param {TeacherSchema} teacher
 */
const validateTeacher = (teacher) => {
  return validate(
    {
      name: string(),
      email: string(),
      description: string(),
      labId: id(),
      managements: arrayOfIds(),
    },
    teacher
  );
};

module.exports = {
  Teacher: TeacherSchema,
  validateTeacher,
};
