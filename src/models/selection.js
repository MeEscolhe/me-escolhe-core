// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const ObjectId = require('mongodb').ObjectID;


// Creating schema
const SelectionSchema = mongoose.model('Selection', new mongoose.Schema({
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
    ref: 'PhaseSchema',
    //required: true,
    default: [],
  },
  current: {
    type: Boolean,
    required: true,
    default: true,
  },
}));

// Adding paginate plugin
//SelectionSchema.plugin(mongoosePaginate);

// Exporting to controllers
exports.Selection = SelectionSchema;

/*function validateSelection(selection) {
  const schemaSelection = Joi.object().keys({
    role: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(50).required()
  });


  return schemaLab.validate(lab.body);
}*/

 
//exports.valSelection = validateSelection;










