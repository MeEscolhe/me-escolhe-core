const mongoose = require('mongoose');
"use strict";

const { ObjectId } = require("mongodb");
const {
  WorkExperience,
  valWorkExperience,
  //getWorkExperienceWithSelections,
} = require("../models/work-experience");

const getAll = () => WorkExperience.find().sort("name");

/**
 * get workexperience by name
 * @param {ObjectId} id workexperience name
 * @typedef {{name: string}} WorkExperienceSchema
 * @returns {WorkExperienceSchema}
 */
const getByID = (id) =>
  WorkExperience.findById((mongoose.Types.ObjectId(id)));
/**
 * get workexperience by name with selections
 */
// const getByRegistrationWithSelections = (registration) =>
//   WorkExperience.findOne({ registration: registration }).then((workexperience) => {
//     if (workexperience && workexperience.error === null)
//       return workexperience.getWorkExperienceWithSelections();
//     return null;
//   });
const create = async ({
  role,
  institution,
  durationInMonths
}) => {
  let workexperience = new WorkExperience({
    role: role,
    institution: institution,
    durationInMonths: durationInMonths,

  });
  workexperience = await workexperience.save();
  return workexperience;
};

const update = ( updateData) => {
  return WorkExperience.findOneAndUpdate(

    { updateData },
    {
      new: true,
    }
  );
};
/**
 * remove workexperience by registration
 * @param {ObjectId} id workexperience registration
 * @returns {WorkExperienceSchema}
 */
const remove = async (id) => WorkExperience.findByIdAndRemove((mongoose.Types.ObjectId(id)));

const validate = (object) => {
  const { error } = valWorkExperience(object);
  return error;
};

module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove,
  validate
  //getByRegistrationWithSelections,
};
