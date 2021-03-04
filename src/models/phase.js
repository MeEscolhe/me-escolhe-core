"use strict";

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const {
  validate,
  id,
  arrayOfRegistrations,
  string,
  foreingKey,
} = require("../middlewares/model-validator");
const { getByRegistration } = require("../controllers/student");
/**
 *  Phase model
 *  @typedef {{students: array, selectionId: string, description: string}} PhaseSchema
 */
const PhaseSchema = mongoose.model(
  "Phase",
  new mongoose.Schema({
    students: foreingKey("Student", "registration", Number, true),
    selectionId: foreingKey("Selection", "_id", ObjectId),
    description: {
      type: String,
      default: "",
    },
  })
);

/**
 * Validade phase from request
 * @param {PhaseSchema} phase
 */
const validatePhase = (phase) =>
  validate(
    {
      students: arrayOfRegistrations(),
      selectionId: id(),
      description: string(),
    },
    phase
  );
const getStudentsData = async (phase) => {
  let { _id, selectionId, description, students } = phase;
  const studentsPhase = await Promise.all(
    students.map(async (student) => await getByRegistration(student))
  );
  return { _id, students: studentsPhase, selectionId, description };
};
module.exports = {
  Phase: PhaseSchema,
  validatePhase,
  getStudentsData,
};
