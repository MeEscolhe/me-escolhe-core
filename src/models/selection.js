"use strict";

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const ObjectId = require("mongodb").ObjectID;
const {
  validate,
  arrayOfIds,
  boolean,
} = require("../middlewares/model-validator");

/**
 *  Selection model
 *  @typedef {{role:string, description:string, phases:array, current:boolean}} SelectionSchema
 */
const SelectionModel = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  phases: {
    type: [ObjectId],
    ref: "PhaseSchema",
    default: [],
  },
  current: {
    type: Boolean,
    required: true,
    default: true,
  },
  skills: {
    type: [ObjectId],
    ref: "SkillSchema",
    default: [],
  },
});

// Setting pagination
SelectionModel.plugin(mongoosePaginate);
const SelectionSchema = mongoose.model("Selection", SelectionModel);

/**
 * validade selection from request
 * @param {SelectionSchema} selection
 */
const validateSelection = (selection) =>
  validate(
    {
      role: string(),
      description: string(),
      phases: arrayOfIds(),
      current: boolean(),
      skills: arrayOfIds(),
    },
    selection
  );

module.exports = {
  Selection: SelectionSchema,
  validateSelection,
};
