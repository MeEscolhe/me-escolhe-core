"use strict";

const {
  Student,
  valStudent,
  getStudentWithSelections,
} = require("../models/student");
const { filterProps } = require("../middlewares/util");
const getAll = () => Student.find().sort("registration");

/**
 * get student by registration
 * @param {string} registration student registration
 * @typedef {{registration: number,name: string,email: string,cra: number,description:string,skills:array,experiences: array,phases: array}} StudentSchema
 * @returns {StudentSchema}
 */
const getByRegistration = (registration) =>
  Student.findOne({ registration: registration });
/**
 * get student by registration with selections
 */
const getByRegistrationWithSelections = (registration) =>
  Student.findOne({ registration: registration }).then((student) => {
    if (student && student.error === undefined)
      return getStudentWithSelections(student);
    return null;
  });
const create = async ({
  registration,
  name,
  email,
  cra,
  description,
  skills,
  experiences,
}) => {
  let student = new Student({
    registration: registration,
    name: name,
    email: email,
    cra: cra,
    description: description,
    skills: skills,
    experiences: experiences,
  });
  student = await student.save();
  return student;
};

const update = (registration, updateData, updatePhase) => {
  console.log(updateData);
  let propsToUpdate = [
    "name",
    "email",
    "cra",
    "description",
    "skills",
    "experiences",
  ];
  if (updatePhase) propsToUpdate.push("phases");

  return Student.findOneAndUpdate(
    { registration: registration },
    {
      registration: registration,
      ...filterProps(
        updateData,
        propsToUpdate,
        (key, value) =>
          (key !== "registration" && value) ||
          (key === "description" && value === "")
      ),
    },
    {
      new: true,
    }
  );
};
/**
 * remove student by registration
 * @param {string} registration student registration
 * @returns {StudentSchema}
 */
const remove = async (registration) => Student.findOneAndDelete(registration);

const validate = (object) => {
  const { error } = valStudent(object);
  return error;
};

module.exports = {
  getAll,
  getByRegistration,
  create,
  update,
  remove,
  validate,
  getByRegistrationWithSelections,
};
