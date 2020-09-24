"use strict";

const { Student } = require("../models/student");

const getAll = async () => {
  const students = await Student.find().sort("registration");
  return students;
};

const getByRegistration = async (registration) => {
  const student = await Student.find(registration);
  return student;
};

const create = async ({
  registration,
  name,
  email,
  cra,
  description,
  skills,
  experiences,
  phases,
}) => {
  let student = new Student({
    registration: registration,
    name: name,
    email: email,
    cra: cra,
    description: description,
    skills: skills,
    experiences: experiences,
    phases: phases,
  });
  student = await student.save();
  return student;
};

const update = async (
  registration,
  { name, email, cra, description, skills, experiences, phases }
) => {
  const student = await Student.findOneAndUpdate(
    registration,
    {
      name: name,
      email: email,
      cra: cra,
      description: description,
      skills: skills,
      experiences: experiences,
      phases: phases,
    },
    { new: true }
  );
  return student;
};

const remove = async (registration) => {
  const student = await Student.findOneAndDelete(registration);
  return student;
};

const validate = (object) => {
  const { error } = valStudent(object);
  return error;
};

module.exports = router;
