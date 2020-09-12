// Importing dependences
const Joi = require('joi');
const mongoose = require("mongoose");

// Creating schema
const StudentSchema = mongoose.model('Lab', new mongoose.Schema({
  registration: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cra: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  description: {
    type: String,
    //required: true,
    default: "",
  },
  skills: {
    type: [String],
    //required: true,
    default: [],
  },
  experiences: {
    type: [String],
    //required: true,
    default: [],
  },
  phases: {
    type: [String],
    //required: true,
    default: [],
  },
})();

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

 






