("use strict");

const { Model } = require("mongoose");
const { ObjectId, CleanObject } = require("../providers/types-provider");

/**
 * Get all objects
 * @param {Model} Model
 * @param {String} sortBy
 * @returns {Array} list of all objects.
 * If sortBy was passed, the array will be sorted
 */
const getAll = async (Model, sortBy = "") => {
  let objects = await Model.find();
  if (sortBy !== "") objects = objects.sort(sortBy);
  return objects;
};

/**
 * Get object by id
 * @param {Model} Model
 * @param {String} id
 * @returns {Array} object with id
 */
const getById = async (Model, id) =>
  (await Model.findById(ObjectId(id))).toObject();

/**
 * Get object by id
 * @param {Model} Model
 * @param {Array} id
 * @returns {Array} objects with ids
 */
const getByIds = async (Model, ids, sortBy = "") => {
  ids = ids.map((id) => ObjectId(id));
  let objects = await Model.find({ _id: { $in: ids } });
  if (sortBy !== "") objects = objects.sort(sortBy);
  return objects;
};

/**
 * Create object
 * @param {Model} Model
 * @param {Object} object
 * @returns {Object} created object
 */
const create = async (Model, object) =>
  (await new Model(object).save()).toObject();

/**
 * Update by id
 * @param {Model} Model
 * @param {String} id
 * @param {Object} newObject
 * @param {Boolean} runValidators (default: true)
 * @returns {Object} Updated object
 */
const updateById = async (Model, id, newObject, runValidators = true) =>
  (
    await Model.findByIdAndUpdate(
      ObjectId(id),
      {
        $set: CleanObject(newObject),
      },
      { new: true, runValidators }
    )
  ).toObject();

/**
 * Remove by id
 * @param {Model} Model
 * @param {String} id
 * @returns {Object} Removed object
 */
const removeById = async (Model, id) =>
  (await Model.findByIdAndRemove(ObjectId(id))).toObject();

module.exports = {
  getAll,
  getById,
  getByIds,
  create,
  updateById,
  removeById,
};
