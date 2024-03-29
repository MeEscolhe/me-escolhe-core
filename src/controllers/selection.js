"use strict";

const { Selection, validateSelection } = require("../models/selection");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const ProjectController = require("../controllers/project");
const PhaseController = require("../controllers/phase");
const LabController = require("../controllers/lab");
const TeacherController = require("../controllers/teacher");
const { isEmpty } = require("../middlewares/util");
const StudentController = require("../controllers/student");
/**
 * Get all selections
 * @returns {array} list of all selections
 */
const getAll = async ({ page, limit }) => {
  const selectionDocsList = await Selection.paginate({}, { page, limit });

  if (isEmpty(selectionDocsList.docs)) {
    return selectionDocsList;
  }

  let selections = selectionDocsList.docs;
  for (let i = 0; i < selections.length; i++) {
    let project = await ProjectController.getById(selections[i].projectId);
    let lab = await LabController.getById(project.labId);

    project = { ...project._doc, lab };
    delete project.labId;

    let selection = { ...selections[i]._doc, project };
    delete selection.projectId;

    selections[i] = selection;
  }
  return selections;
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
  description,
  current,
  projectId,
  phases,
  skills,
}) => {
  let selection = await new Selection({
    role: role,
    description: description,
    phases: phases,
    current: current,
    projectId: projectId,
    skills: skills,
  }).save();
  const phase = await PhaseController.create({
    students: [],
    selectionId: selection._id,
    description: "",
  });
  selection.phases.push(phase._id);
  let project = await ProjectController.getById(projectId);
  project.selections.push(selection._id);
  await ProjectController.update(projectId, project);
  return await update(selection._id, selection);
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
  const selection = await getById(id);

  let project = await ProjectController.getById(selection.projectId);
  if (project) {
    project.selections = project.selections.filter(
      (selectionId) => selectionId.toString() !== id.toString()
    );
    let phases = selection.phases.map(
      async (phase) => await PhaseController.remove(phase)
    );
    await ProjectController.update(project._id, project);
    return await Selection.findByIdAndRemove(ObjectId(id));
  } else {
    throw new Error("Project id not found");
  }
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
  create,
  update,
  remove,
  validate,
};
