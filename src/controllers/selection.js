"use strict";

const { Selection, validateSelection } = require("../models/selection");
const { Project } = require("../models/project");
const MongoDb = require("../middlewares/mongodb-middleware");
const {
  DefaultBoolean,
  DefaultArray,
  DefaultSkills,
  DefaultString,
  DefaultPage,
  DefaultPageLimit,
} = require("../providers/default-values-provider");
const TeacherController = require("./teacher");
const StudentController = require("./student");
const ProjectController = require("./project");
const { overrideAttribute, isEmpty } = require("../middlewares/utils");
const { Student } = require("../models/student");

/**
 * Get all selections
 * @returns {array} list of all selections
 *
 */
const getAll = async ({ page = DefaultPage, limit = DefaultPageLimit }) => {
  let paginate = await MongoDb.getAll(Selection, "", { page, limit });
  paginate.docs = await Promise.all(
    await paginate.docs.map(
      async (selection) =>
        await overrideAttribute(
          selection,
          "projectId",
          "project",
          await MongoDb.getById(Project, selection.projectId)
        )
    )
  );
  return paginate;
};

/**
 * Get selection by id with students, project and lab
 * @param {string} id
 * @returns {object} selection
 */
const getFullById = async (id) => {
  let selection = await MongoDb.getById(Selection, id);
  if (selection)
    selection = overrideAttribute(
      selection,
      "projectId",
      "project",
      await ProjectController.getById(selection.projectId)
    );
  selection.students = await MongoDb.getByRegistrations(selection.students);
  return selection;
};

/**
 * Get selections by list of ids
 * @param {array} ids
 * @returns {array} list of selections
 */
const getByIds = async (ids) => await Selection.find({ _id: { $in: ids } });

/**
 * Create selection,phase and push selection id in project selections list
 * @param {string} role
 * @param {string} description
 * @param {array} phases
 * @param {boolean} current
 * @param {array} skills
 * @returns {object} project created
 */
const create = async ({
  role,
  description = DefaultString,
  current = DefaultBoolean,
  projectId,
  phases = DefaultArray,
  skills = DefaultSkills,
}) => {
  const selection = MongoDb.create(Selection, {
    role,
    description,
    phases,
    current,
    projectId,
    skills,
  });
  await MongoDb.addOnArrayById(Project, projectId, "selections", selection._id);
  return overrideAttribute(
    selection,
    "projectId",
    "project",
    await MongoDb.getById(Project, projectId)
  );
};

/**
 * Update selection by id
 * @param {string} id
 * @param {object} updateData, data to update
 * @returns {object} selection updated
 */
const update = async (id, updateData) =>
  await MongoDb.updateById(Selection, id, updateData);

/**
 * Remove selection by id
 * @param {string} id
 * @returns {object} selection removed
 */
const remove = async (id) => {
  await MongoDb.removeOfArrays(Student, "selections", id);
  return await MongoDb.removeById(Project, id);
};

/**
 * Validate selection
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = validateSelection(object);
  return error;
};

module.exports = {
  getAll,
  getFullById,
  getByIds,
  create,
  update,
  remove,
  validate,
};
