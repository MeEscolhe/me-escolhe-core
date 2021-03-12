"use strict";

const { Project, validateProject } = require("../models/project");
const { Lab } = require("../models/lab");
const MongoDb = require("../middlewares/mongodb-middleware");
const { DefaultArray } = require("../providers/default-values-provider");
const { overrideAttribute } = require("../middlewares/utils");

/**
 * Get all projects
 * @returns {array} list of all projects
 */
const getAll = async () =>
  await Promise.all(
    (await MongoDb.getAll(Project, "name")).map(
      async (project) => await getLab(project)
    )
  );

/**
 * Get project by id
 * @param {string} id
 * @returns {object} project
 */
const getById = async (id) => {
  let project = await MongoDb.getById(Project, id);
  if (project)
    project = overrideAttribute(
      project,
      "labId",
      "lab",
      await MongoDb.getById(Lab, project.labId)
    );
  return project;
};

/**
 * Get all projects by list id
 * @returns {array} list of all projects
 */
const getByIds = async (ids) => await MongoDb.getByIds(ids, "name");

/**
 * Create project
 * @param {string} name
 * @param {string} description
 * @param {array} selections
 * @returns {object} project created
 */
const create = async ({
  name,
  description,
  labId,
  selections = DefaultArray,
}) => {
  const project = MongoDb.create(Project, {
    name,
    description,
    labId,
    selections,
  });
  return await overrideAttribute(
    project,
    "labId",
    "lab",
    await MongoDb.getById(Lab, labId)
  );
};

/**
 * Update project by id
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {array} selections
 * @returns {object} project updated
 */
const update = async (id, { name, description, labId, selections }) =>
  await MongoDb.updateById(Project, id, {
    name,
    description,
    labId,
    selections,
  });

/**
 * Remove project by id
 * @param {string} id
 * @returns {object} project removed
 */
const remove = async (id) => await MongoDb.removeById(Project, id);

/**
 * Remove projects by ids
 * @param {string} labId
 * @returns {object} removed projects
 */
const removeByLabId = async (labId) => {
  const removedProjects = await MongoDb.removeByAttributes(Project, { labId });
  if (removedProjects.length === 0) return removedProjects;
  await Promise.all(
    removedProjects.forEach(async (project) => {
      await MongoDb.removeByIds(project.selections);
    })
  );
  return removedProjects;
};

/**
 * Validate project
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateProject(object);
  return error;
};

module.exports = {
  getAll,
  getByIds,
  getById,
  create,
  update,
  remove,
  removeByLabId,
  validate,
};
