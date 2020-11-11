"use strict";

const ProjectController = require("../controllers/project");
const LabController = require("../controllers/lab");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    let projects = await ProjectController.getAll();
    if (isEmpty(projects)) {
      response.status(404).send("No projects to show.");
    } else {
      for (let i = 0; i < projects.length; i++) {
        const lab = await LabController.getById(projects[i].labId);
        projects[i] = { ...projects[i]._doc, lab };
      }
      response.send(projects);
    }
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, ProjectController);
    if (error) {
      response.status(400).send(message);
    } else {
      const project = await ProjectController.create(request.body);
      response.send(project);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    let project = await ProjectController.getById(request.params.id);
    if (!project) {
      response.status(404).send("The project with the given ID was not found.");
    } else {
      const lab = await LabController.getById(project.labId);
      project = { ...project._doc, lab };
      response.send(project);
    }
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, ProjectController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["name", "description", "labId", "selections"];
      const project = await ProjectController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!project) {
        response
          .status(404)
          .send("The project with the given ID was not found.");
      } else {
        response.send(project);
      }
    }
  });

router.route("/:registration").delete(async (request, response) => {
  const project = await ProjectController.remove(request.params.registration);
  if (!project) {
    response
      .status(404)
      .send("The project with the given registration was not found.");
  } else {
    response.send(project);
  }
});

module.exports = router;
