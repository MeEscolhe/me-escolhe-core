"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const { Lab, validateLab } = require("../models/lab");
const ProjectController = require("../controllers/project");
const MongoDb = require("../middlewares/mongodb-middleware");

/**
 * Get all labs
 * @returns {array} list of all labs
 */
const getAll = async () => await MongoDb.getAll(Lab, "name");

/**
 * Get lab by id
 * @param {string} id
 * @returns {object} lab
 */
const getById = async (id) => await MongoDb.getById(Lab, id);

/**
 * Create lab
 * @param {string} name
 * @param {string} description
 * @returns {object} lab created
 */
const create = async ({ name, description }) =>
  await MongoDb.create(Lab, {
    name,
    description,
  });

/**
 * Update lab by id
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @returns {object} lab updated
 */
const update = async (id, { name, description }, runValidators = true) =>
  await MongoDb.updateById(
    Lab,
    id,
    {
      name,
      description,
    },
    runValidators
  );

/**
 * Remove lab by id
 * @param {string} id
 * @returns {object} lab removed
 */
const remove = async (id) => {
  await ProjectController.removeByLabId(id);
  return await MongoDb.removeById(id);
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
