("use strict");

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 * @author Kelvin Cirne <kelvin.cirne.custodio@ccc.ufcg.edu.br>
 */

const { Model } = require("mongoose");
const { DefaultObject } = require("../providers/default-values-provider");
const { ObjectId, CleanObject } = require("../providers/types-provider");

/**
 * Get all objects
 * @param {Model} Model
 * @param {String} sortBy
 * @param {String} paginate { page, limit }
 * @returns {Array} list of all objects.
 * If sortBy was passed, the array will be sorted
 */
const getAll = async (Model, sortBy, paginate) => {
  let objects = [];
  if (paginate) {
    objects = await Model.paginate(DefaultObject, paginate);
  } else {
    objects = await Model.find();
  }
  if (sortBy)
    objects.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]));
  return objects;
};

/**
 * Get object by id
 * @param {Model} Model
 * @param {String} id
 * @returns {Array} object with id
 */
const getById = async (Model, id) => {
  let object = await Model.findById(ObjectId(id));
  if (object) object = object.toObject();
  return object;
};

/**
 * Get object by registration
 * @param {Model} Model
 * @param {Number} registration
 * @returns {Array} object with registration
 */
const getByRegistration = async (Model, registration) => {
  let object = await Model.findOne({ registration: parseInt(registration) });
  if (object) object = object.toObject();
  return object;
};

/**
 * Get object by email
 * @param {Model} Model
 * @param {String} email
 * @returns {Array} object with registration
 */
const getByEmail = async (Model, email) => {
  let object = await Model.findOne({ email });
  if (object) object = object.toObject();
  return object;
};

/**
 * Get objects by ids
 * @param {Model} Model
 * @param {Array} id
 * @returns {Array} objects with ids
 */
const getByIds = async (Model, ids, sortBy) => {
  ids = ids.map((id) => ObjectId(id));
  let objects = await Model.find({ _id: { $in: ids } });
  if (sortBy)
    objects = objects.sort(
      (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy])
    );
  return objects;
};

/**
 * Get objects by ids
 * @param {Model} Model
 * @param {Object} attributes
 * @returns {Array} objects with ids
 */
const getByAttributes = async (Model, attributes, sortBy) => {
  let objects = await Model.find(attributes);
  if (sortBy)
    objects = objects.sort(
      (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy])
    );
  return objects;
};

/**
 * Get objects by registrations
 * @param {Model} Model
 * @param {Array} registrations
 * @returns {Array} objects with ids
 */
const getByRegistrations = async (Model, registrations, sortBy = "") => {
  let objects = await Model.find({ registration: { $in: registrations } });
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
 * Update by registration
 * @param {Model} Model
 * @param {String} registration
 * @param {Object} newObject
 * @param {Boolean} runValidators (default: true)
 * @returns {Object} Updated object
 */
const updateByRegistration = async (
  Model,
  registration,
  newObject,
  runValidators = true
) =>
  await Model.findOneAndUpdate(
    { registration: parseInt(registration) },
    {
      $set: CleanObject(newObject),
    },
    { new: true, runValidators }
  );

/**
 * Update by email
 * @param {Model} Model
 * @param {String} email
 * @param {Object} newObject
 * @param {Boolean} runValidators (default: true)
 * @returns {Object} Updated object
 */
const updateByEmail = async (Model, email, newObject, runValidators = true) =>
  await Model.findOneAndUpdate(
    { email },
    {
      $set: CleanObject(newObject),
    },
    { new: true, runValidators }
  );

/**
 * Remove by id
 * @param {Model} Model
 * @param {String} id
 * @returns {Object} Removed object
 */
const removeById = async (Model, id) =>
  await Model.findByIdAndRemove(ObjectId(id));

/**
 * Remove by id
 * @param {Model} Model
 * @param {String} registration
 * @returns {Object} Removed object
 */
const removeByRegistration = async (Model, registration) =>
  await Model.deleteOne({ registration });

/**
 * Remove by email
 * @param {Model} Model
 * @param {String} email
 * @returns {Object} Removed object
 */
const removeByEmail = async (Model, email) => await Model.deleteOne({ email });

/**
 * Remove objects by ids
 * @param {Model} Model
 * @param {Array} ids
 * @returns {Array} objects with ids
 */
const removeByIds = async (Model, ids, sortBy = "") => {
  ids = ids.map((id) => ObjectId(id));
  let objects = await Model.deleteMany({ _id: { $in: ids } });
  if (sortBy !== "") objects = objects.sort(sortBy);
  return objects;
};

/**
 * Remove by attributes
 * @param {Model} Model
 * @param {Object} attributes
 * @returns {Object} Removed object
 */
const removeByAttributes = async (Model, attributes) => {
  const objects = getByAttributes(Model, attributes);
  await Model.deleteMany(attributes);
  return objects;
};

/**
 * Add identifier in array of model
 * @param {Model} Model
 * @param {String} arrayAttribute field
 * @param {String} id
 */
const addOnArray = async (Model, condition, arrayAttribute, id) => {
  let filter = {};
  filter[arrayAttribute] = id;
  await Model.update(condition, {
    $push: filter,
  });
};

/**
 * Add identifier on array of model by ID
 * @param {Model} Model
 * @param {String} arrayAttribute field
 * @param {String} id
 */
const addOnArrayById = async (Model, modelId, arrayAttribute, id) =>
  await addOnArray(Model, { _id: ObjectId(modelId) }, arrayAttribute, id);

/**
 * Add identifier on array of model by ID
 * @param {Model} Model
 * @param {String} arrayAttribute field
 * @param {String} id
 */
const addOnArrayByRegistration = async (
  Model,
  registration,
  arrayAttribute,
  id
) => await addOnArray(Model, { registration }, arrayAttribute, id);

/**
 * Remove identifier from array in model objects
 * @param {Model} Model
 * @param {String} arrayAttribute field
 * @param {String} identifier id or registration
 */
const removeFromArray = async (
  Model,
  condition,
  arrayAttribute,
  identifier
) => {
  let filter = {};
  filter[arrayAttribute] = identifier;
  await Model.updateMany(condition, {
    $pull: filter,
  });
};

/**
 * Remove identifier from arrays in model objects
 * @param {Model} Model
 * @param {String} arrayAttribute field
 * @param {String} identifier id or registration
 */
const removeFromArrays = async (Model, arrayAttribute, id) =>
  await removeFromArray(Model, DefaultObject, arrayAttribute, id);

/**
 * Remove identifier from array in model objects by id
 * @param {Model} Model
 * @param {String} arrayAttribute field
 * @param {String} identifier id or registration
 */
const removeFromArrayById = async (Model, modelId, arrayAttribute, id) =>
  await removeFromArray(Model, { _id: ObjectId(modelId) }, arrayAttribute, id);

/**
 * Remove identifier from array in model objects by id
 * @param {Model} Model
 * @param {String} arrayAttribute field
 * @param {String} identifier id or registration
 */
const removeFromArrayByRegistration = async (
  Model,
  registration,
  arrayAttribute,
  id
) => await removeFromArray(Model, { registration }, arrayAttribute, id);

module.exports = {
  addOnArrayById,
  addOnArrayByRegistration,
  getAll,
  getById,
  getByRegistration,
  getByEmail,
  getByIds,
  getByRegistrations,
  getByAttributes,
  create,
  updateById,
  updateByRegistration,
  updateByEmail,
  removeById,
  removeByRegistration,
  removeByEmail,
  removeByAttributes,
  removeByIds,
  removeFromArrays,
  removeFromArrayById,
  removeFromArrayByRegistration,
};
