"use strict";

const ProjectController = require("../controllers/project");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const projects = await ProjectController.getAll();
    if (isEmpty(projects)) {
      response.status(404).send("No projects to show.");
    } else {
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
    const project = await ProjectController.getById(request.params.id);
    if (!project) {
      response.status(404).send("The project with the given ID was not found.");
    } else {
      response.send(project);
    }
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, ProjectController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["name", "description", "selections"];
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
