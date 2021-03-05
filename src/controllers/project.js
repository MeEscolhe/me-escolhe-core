"use strict";

const { Project, validateProject } = require("../models/project");
const SelectionController = require("./selection");
const { DefaultArray } = require("../middlewares/default-values-provider");
const { ObjectId } = require("../middlewares/types-provider");
const { Lab } = require("../models/lab");

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
const getAll = async () => {
  const projects = await Promise.all(
    (await Project.find().sort("name")).map(
      async (project) => await getLab(project)
    )
  );
  return projects;
};

/**
 * Get project by id
 * @param {string} id
 * @returns {object} project
 */
const getById = async (id) => getLab(await Project.findById(ObjectId(id)));

/**
 * Get all projects by list id
 * @returns {array} list of all projects
 */
const getByIds = async (list_id) => {
  let objectIds = [];
  list_id.map((id) => objectIds.push(ObjectId(id)));
  return await Project.find({ _id: { $in: objectIds } }).sort("name");
};

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
const update = async (
  id,
  { name, description, labId, selections = DefaultArray }
) =>
  await Project.findByIdAndUpdate(
    ObjectId(id),
    {
      name,
      description,
      labId,
      selections,
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
