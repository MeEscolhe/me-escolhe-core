"use strict";

const { Selection, validateSelection } = require("../models/selection");
const { Project } = require("../models/project");
const MongoDb = require("../middlewares/mongodb-middleware");
const {
  DefaultBoolean,
  DefaultArray,
  DefaultSkills,
  DefaultString,
  DefaultObject,
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
 * Get all students with selections
 * @returns {array} list of all selections
 */
const getAllStudentsWithSelections = async () => {
  let students = await MongoDb.getAll(Student, "name");
  if (isEmpty(students)) return students;
  return await Promise.all(
    students.map(async (student) => {
      student.selections = await student.selections.map(
        async (selectionId) => await MongoDb.getById(Selection, selectionId)
      );
      return student;
    })
  );
};

/**
 * TO-DO
 * Get all teacher's selections
 * @returns {array} list of all selections
 */
const getAllTeacherSelections = async (teacherId) => {
  const teacher = await TeacherController.getById(teacherId);
  if (teacher) {
    const allprojects = await ProjectController.getAll();
    const teacherProjects = allprojects.filter((project) =>
      teacher.managements.some((teacherProjectId) =>
        project._id.equals(teacherProjectId)
      )
    );
    const teacherSelections = await Promise.all(
      teacherProjects.map(async (project) => {
        const selections = await Selection.find()
          .where("_id")
          .in(project.selections);
        let lab = await LabController.getById(project.labId);
        delete project.labId;
        project = { ...project._doc, lab };
        return selections.map((selection) => {
          delete selection.projectId;
          return { ...selection._doc, project };
        });
      })
    );
    return teacherSelections.reduce((list, line) => list.concat(line), []);
  } else {
    throw new Error("The teacher with the given ID was not found.");
  }
};

/**
 * Get selection by id
 * @param {string} id
 * @returns {object} selection
 */
const getByIdWithProjectAndLab = async (id) => {
  let selection = await MongoDb.getById(Selection, id);
  if (selection)
    selection = overrideAttribute(
      selection,
      "projectId",
      "project",
      await ProjectController.getById(selection.projectId)
    );
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
  getAllTeacherSelections,
  getByIdWithProjectAndLab,
  getByIds,
  create,
  update,
  remove,
  validate,
};
