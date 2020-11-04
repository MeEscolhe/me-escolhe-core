const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const ObjectId = require("mongodb").ObjectID;
const Joi = require("joi");

/**
 *
 *  @typedef {{role:string,description:string,phases:array,current:boolean}} SelectionSchema
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

SelectionModel.plugin(mongoosePaginate);

const SelectionSchema = mongoose.model("Selection", SelectionModel);

/**
 * validade selection from request
 * @param {SelectionSchema} selection
 */
const valSelection = (selection) => {
  const selectionSchema = Joi.object().keys({
    role: Joi.string().min(3).max(30).required(),
    description: Joi.string().allow("").min(0).max(50).required(),
    phases: Joi.array().items(Joi.string()).min(0).required(),
    current: Joi.boolean().required(),
    skills: Joi.array().items(Joi.string()).min(0).required(),
  });

  return selectionSchema.validate(selection);
};

module.exports = {
  Selection: SelectionSchema,
  valSelection,
};
