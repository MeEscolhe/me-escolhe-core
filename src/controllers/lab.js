"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const { Lab, validateLab } = require("../models/lab");
const ProjectController = require("../controllers/project");
const { CleanObject, ObjectId } = require("../middlewares/types-provider");

/**
 * Get all labs
 * @returns {array} list of all labs
 */
const getAll = async () => await Lab.find().sort("name");

/**
 * Get lab by id
 * @param {string} id
 * @returns {object} lab
 */
const getById = async (id) => await Lab.findById(ObjectId(id));

/**
 * Create lab
 * @param {string} name
 * @param {string} description
 * @returns {object} lab created
 */
const create = async ({ name, description }) => {
  const lab = new Lab({
    name: name,
    description: description,
  });
  return await lab.save();
};

/**
 * Update lab by id
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @returns {object} lab updated
 */
const update = async (id, { name, description }, runValidators = true) =>
  await Lab.findByIdAndUpdate(
    ObjectId(id),
    {
      $set: CleanObject({
        name,
        description,
      }),
    },
    { new: true, runValidators: runValidators }
  );

/**
 * Remove lab by id
 * @param {string} id
 * @returns {object} lab removed
 */
const remove = async (id) => {
  await ProjectController.removeByLabId(id);
  return await Lab.findByIdAndRemove(ObjectId(id));
};

/**
 * Validate hard skill
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateLab(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
