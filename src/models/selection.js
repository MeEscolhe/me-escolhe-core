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
    description: Joi.string().optional().allow("").min(0).max(50),
    phases: Joi.array().items(Joi.string()).min(0),
    current: Joi.boolean().required(),
  });

  return selectionSchema.validate(selection);
};

module.exports = {
  Selection: SelectionSchema,
  valSelection,
};
