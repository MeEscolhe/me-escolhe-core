const mongoose = require('mongoose');
"use strict";

const { ObjectId } = require("mongodb");
const {
  Soft,
  valSoft,
  //getSoftWithSelections,
} = require("../models/soft");

const getAll = () => Soft.find().sort("name");

/**
 * get soft by name
 * @param {ObjectId} id soft name
 * @typedef {{name: string}} SoftSchema
 * @returns {SoftSchema}
 */
const getByID = (id) =>
  Soft.findById((mongoose.Types.ObjectId(id)));
/**
 * get soft by name with selections
 */
// const getByRegistrationWithSelections = (registration) =>
//   Soft.findOne({ registration: registration }).then((soft) => {
//     if (soft && soft.error === null)
//       return soft.getSoftWithSelections();
//     return null;
//   });
const create = async ({
  name
}) => {
  let soft = new Soft({
    name: name
  });
  soft = await soft.save();
  return soft;
};

const update = (name, updateData) => {
  return Soft.findOneAndUpdate(
    { name: name },
    { name: name, ...updateData },
    {
      new: true,
    }
  );
};
/**
 * remove soft by registration
 * @param {ObjectId} id soft registration
 * @returns {SoftSchema}
 */
const remove = async (id) => Soft.findByIdAndRemove((mongoose.Types.ObjectId(id)));

const validate = (object) => {
  const { error } = valSoft(object);
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
