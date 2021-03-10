"use strict";

const { Selection, validateSelection } = require("../models/selection");
const { Project } = require("../models/project");
const { Lab } = require("../models/lab");
const { ObjectId } = require("../providers/types-provider");
const {
  DefaultBoolean,
  DefaultArray,
  DefaultSkills,
  DefaultString,
  DefaultObject,
} = require("../providers/default-values-provider");
const PhaseController = require("../controllers/phase");
const TeacherController = require("../controllers/teacher");
const { isEmpty } = require("../middlewares/utils");
const StudentController = require("../controllers/student");

/**
 * Add project in selection
 * @param {object} selection
 * @returns {object} selection with project
 */
const addProject = async (selection) => {
  let project = (
    await Project.findById(ObjectId(selection.projectId))
  ).toObject();
  project.lab = await Lab.findById(ObjectId(project.labId));
  delete project["labId"];

  selection.project = project;
  delete selection["projectId"];
  return selection;
};

/**
 * Get all selections
 * @returns {array} list of all selections
 *
 */
const getAll = async ({ page, limit }) => {
  let paginate = await Selection.paginate(DefaultObject, { page, limit });
  paginate.docs = await Promise.all(
    await paginate.docs.map(
      async (selection) => await addProject(selection.toObject())
    )
  );
  return paginate;
};

/**
 * Get all teacher's selections
 * @returns {array} list of all selections
 */
const getAllStudentSelections = async (studentRegistration) => {
  const student = await StudentController.getByRegistration(
    studentRegistration
  );
  if (student) {
    const studentPhases = await PhaseController.getStudentsPhase(student);
    const studentSelections = await Promise.all(
      studentPhases.map(async (phase) => await getById(phase.selectionId))
    );
    return studentSelections;
  } else {
    throw new Error("The teacher with the given ID was not found.");
  }
};
/**
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
const getById = async (id) => {
  let selection = await Selection.findById(ObjectId(id));
  if (selection) {
    let project = await ProjectController.getById(selection.projectId);
    let lab = await LabController.getById(project.labId);
    delete project.labId;
    delete selection.projectId;
    project = { ...project._doc, lab };
    return { ...selection._doc, project };
  } else {
    throw new Error("The selection with the given ID was not found.");
  }
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
  let selection = await new Selection({
    role,
    description,
    phases,
    current,
    projectId,
    skills,
  }).save();
  return await addProject(selection.toObject());
};

/**
 * Update selection by id
 * @param {string} id
 * @param {object} updateData, data to update
 * @returns {object} selection updated
 */
const update = async (id, updateData) =>
  await Selection.findByIdAndUpdate(ObjectId(id), updateData, { new: true });

/**
 * Remove selection by id
 * @param {string} id
 * @returns {object} selection removed
 */
const remove = async (id) => {
  const selection = await Selection.findByIdAndRemove(ObjectId(id));
  PhaseController.removeByIds(selection.phases);
  return selection;
};

const removeByProjectId = async (id) => {
  const selections = await Selection.find({ projectId: id });
  await Selection.deleteMany({ projectId: id });
  selections
    .map((selection) => selection.phases)
    .forEach((phasesList) => PhaseController.removeByIds(phasesList));
  return selections;
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
  getAllStudentSelections,
  getById,
  getByIds,
  create,
  update,
  remove,
  removeByProjectId,
  validate,
};
