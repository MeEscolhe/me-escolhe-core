"use strict";

const ProjectController = require("../controllers/project");
const LabController = require("../controllers/lab");
const TeacherController = require("../controllers/teacher");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    let projects = await ProjectController.getAll();
    if (isEmpty(projects)) {
      return response.status(404).send("No projects to show.");
    }
    for (let i = 0; i < projects.length; i++) {
      const lab = await LabController.getById(projects[i].labId);
      projects[i] = { ...projects[i]._doc, lab };
      delete projects[i].labId;
    }
    return response.send(projects);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, ProjectController);
    if (error) {
      return response.status(400).send(message);
    } else {
      try {
        let project = await ProjectController.create(request.body);
        const lab = await LabController.getById(project.labId);
        project = { ...project._doc, lab };
        delete project.labId;
        return response.send(project);
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    let project = await ProjectController.getById(request.params.id);
    if (!project) {
      return response
        .status(404)
        .send("The project with the given ID was not found.");
    } else {
      const lab = await LabController.getById(project.labId);
      project = { ...project._doc, lab };
      delete project.labId;
      return response.send(project);
    }
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, ProjectController);
    if (error) {
      return response.status(400).send(message);
    } else {
      const propsToUpdate = ["name", "description", "labId", "selections"];
      try {
        let project = await ProjectController.update(
          request.params.id,
          filterProps(request.body, propsToUpdate)
        );
        if (!project) {
          response
            .status(404)
            .send("The project with the given ID was not found.");
        } else {
          const lab = await LabController.getById(project.labId);
          project = { ...project._doc, lab };
          delete project.labId;
          return response.send(project);
        }
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  })

  .delete(async (request, response) => {
    let project = await ProjectController.remove(request.params.id);
    if (!project) {
      return response
        .status(404)
        .send("The project with the given registration was not found.");
    }
    const lab = await LabController.getById(project.labId);
    project = { ...project._doc, lab };
    delete project.labId;
    return response.send(project);
  });

router.route("/:teacherId").get(async (request, response) => {
  const teacher = await TeacherController.getById(request.params.teacherId);
  let projects = await ProjectController.getAll(teacher.managements);
  if (isEmpty(projects)) {
    return response.status(404).send("No projects to show.");
  }
  for (let i = 0; i < projects.length; i++) {
    const lab = await LabController.getById(projects[i].labId);
    projects[i] = { ...projects[i]._doc, lab };
    delete projects[i].labId;
  }
  return response.send(projects);
});

module.exports = router;
