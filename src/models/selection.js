"use strict";

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const {
  validate,
  string,
  arrayOfIds,
  array,
  boolean,
  numericRange,
  id,
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
    type: [String],
    required: true,
    default: [],
  },
  current: {
    type: Boolean,
    required: true,
    default: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  skills: {
    hardSkills: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: Number,
          enum: [0, 1, 2, 3, 4],
          default: 2,
          required: true,
          default: 0,
        },
      },
    ],
    softSkills: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    languages: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: Number,
          enum: [0, 1, 2],
          default: 1,
          required: true,
          default: "",
        },
      },
    ],
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
      projectId: id(),
      skills: {
        hardSkills: array({
          name: string(),
          level: numericRange(0, 4),
        }),
        softSkills: array({
          name: string(),
        }),
        languages: array({
          name: string(),
          level: numericRange(0, 2),
        }),
      },
    },
    selection
  );

module.exports = {
  Selection: SelectionSchema,
  validateSelection,
};
