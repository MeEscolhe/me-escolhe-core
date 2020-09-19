// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

// Creating schema
const StudentSchema = mongoose.model('Student', new mongoose.Schema({
  registration: 
  {
    type: Number,
    required: true,
    unique: true
  },
  name: 
  {
    type: String,
    required: true
  },
  email: 
  {
    type: String,
    required: true
  },
  cra: 
  {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  description: 
  {
    type: String,
    //required: true,
    default: ""
  },
  skills: 
  {
    type: [ObjectId],
    ref: 'SkillSchema',
    //required: true,
    default: []
  },
  experiences: 
  {
    type: [ObjectId], 
    ref: 'ExperienceSchema',
    //required: true,
    default: []
  },
  phases: 
  {
    type: [ObjectId],
    ref: 'PhaseSchema',
    //required: true,
    default: []
  },
}));

// Exporting to controllers
exports.Student = StudentSchema;








/*function validateStudent(student) {
  const schemaStudent = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    
  });


  return schemaStudent.validate(student.body);
}

exports.valStudent = validateStudent;
*/

 

