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

 


/*
var userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  name: {
      first: { type: String, required: true, trim: true},
      last: { type: String, required: true, trim: true}
  },
  phone: Number,
  lists: [listSchema],
  friends: [{ type : ObjectId, ref: 'User' }],
  accessToken: { type: String } // Used for Remember Me
});
exports.User = mongoose.model('User', userSchema);
This way you can do this query:

var User = schemas.User;
User
 .find()
 .populate('friends')
 .exec(...)
You'll see that each User will have an array of Users (this user's friends).

And the correct way to insert is like Gabor said:

user.friends.push(newFriend._id);*/





