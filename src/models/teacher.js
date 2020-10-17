const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const Joi = require("joi");

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

exports.Teacher = TeacherSchema;


/**
 * validade student from request
 * @param {TeacherSchema} teacher
 */
const valStudent = (teacher) => {
  const teacherSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(10).required(),
    description: Joi.string().required().allow("").min(0).max(50),
    labId: Joi.string().required(),
    managements: Joi.string().required(),
  });

  return teacherSchema.validate(teacher);
};
