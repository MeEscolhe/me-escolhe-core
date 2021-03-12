"use strict";

const { Project, validateProject } = require("../models/project");
const { Lab } = require("../models/lab");
const SelectionController = require("./selection");
const MongoDb = require("../middlewares/mongodb-middleware");
const { DefaultArray } = require("../providers/default-values-provider");
const { ObjectId } = require("../providers/types-provider");

/**
 * Get project with lab
 * @param {string} project
 * @returns {object} project with lab
 */
const getLab = async (project) => {
  project = project.toObject();
  project.lab = await Lab.findById(ObjectId(project.labId));
  delete project["labId"];
  return project;
};

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
const getById = async (id) => getLab(await MongoDb.getById(Project, id));

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
  const project = new Project({
    name,
    description,
    labId,
    selections,
  });
  let createdProject = getLab(await project.save());
  return createdProject;
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
  await Project.findByIdAndUpdate(
    ObjectId(id),
    {
      $set: CleanObject({
        name,
        description,
        labId,
        selections,
      }),
    },
    { new: true }
  );

/**
 * Remove project by id
 * @param {string} id
 * @returns {object} project removed
 */
const remove = async (id) => {
  const project = await Project.findByIdAndRemove(ObjectId(id));
  SelectionController.removeByProjectId(id);
  return project;
};

/**
 * Remove projects by ids
 * @param {string} id
 * @returns {object} removed projects
 */
const removeByLabId = async (id) => {
  const projects = await Project.find({ labId: id });
  await Project.deleteMany({ labId: id });
  const projectIds = projects.map((project) => project._id);
  for (const projectId in projectIds) {
    SelectionController.removeByProjectId(projectId);
  }
  return projects;
};

/**
 * Add selection to your respective project
 * @param {object} selection
 */
const addSelection = async (selection) => {
  let project = await getById(selection.projectId);
  project = { ...project._doc };
  project.selections.push(selection._id);
  await update(project._id, project);
};

/**
 * Remove selection to your respective project
 * @param {string} selectionId
 */
const removeSelection = async (selectionId) => {
  let project = await Project.findOne({ selections: selectionId.toString() });
  project = { ...project._doc };
  project.selections = project.selections.filter(
    (item) => item != selectionId.toString()
  );
  await update(project._id, project);
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
  addSelection,
  removeSelection,
  validate,
};
