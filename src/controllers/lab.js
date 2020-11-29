"use strict";

const { Lab, validateLab } = require("../models/lab");
const mongoose = require("mongoose");
const teacher = require("../models/teacher");
const ProjectController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const TeacherController = require("./teacher");
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
const getById = async (id) => await Lab.findById(mongoose.Types.ObjectId(id));

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
    mongoose.Types.ObjectId(id),
    {
      name: name,
      description: description,
    },
    { new: true, runValidators: runValidators }
  );

/**
 * Remove lab by id
 * @param {string} id
 * @returns {object} lab removed
 */
const remove = async (id) => {
  const lab = await getById(id);
  if (lab) {
    const projects = await ProjectController.getAll();
    await projects
      .filter((project) => project.labId.toString() === id.toString())
      .forEach(async (project) => await ProjectController.remove(project._id));
    const teachers = await TeacherController.getAll();
    await Promise.all(
      teachers
        .filter((teacher) => {
          const { labId } = teacher;
          return labId ? teacher.labId.toString() === id.toString() : false;
        })
        .map((teacher) => {
          const {
            description,
            managements,
            _id,
            name,
            email,
            password,
          } = teacher;
          return TeacherController.update(
            teacher._id,
            {
              description,
              managements,
              _id,
              name,
              email,
              password,
              labId: null,
            },
            false
          );
        })
    );
    return await Lab.findByIdAndRemove(mongoose.Types.ObjectId(id));
  } else {
    throw new Error("The lab with the given ID was not found.");
  }
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
