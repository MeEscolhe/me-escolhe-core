"use strict";

const ProjectController = require("../controllers/project");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps  } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => {
    ProjectController.getAll().then((projects) => {
      if (isEmpty(projects)) {
        response.status(404).send("No projects to show.");
      } else {
        response.send(projects);
      }
    });
  })
  .post(async (request, response) => {
    const { error, message } = validate(request.body, ProjectController);

    if (error) {
      response.status(400).send(message);
    } else {
      const project = ProjectController.create(request.body);
      response.send(project);
    }
  });

router.get("/:id", async (request, response) => {
  ProjectController.getByID(
    request.params.id
  ).then((project) => {
    if (!project) {
      response.status(404).send("The project with the given ID was not found.");
    } else {
      response.send(project);
    }
  });
});
router.put("/:id", (request, response) => {
  const { error, message } = validate(request.body, ProjectController);
  if (error) {
    response.status(400).send(message);
  } else {
    const propsToUpdate = ["name", "description", "selections"];
    ProjectController
      .update(request.params.id, filterProps(request.body, propsToUpdate))
      .then((project) => {
        if (!project) {
          response
            .status(404)
            .send("The project with the given ID was not found.");
        } else {
          response.send(project);
        }
      });
  }
});

router.delete("/:registration", async (request, response) => {
  ProjectController.remove(request.params.registration).then((project) => {
    if (!project) {
      response
        .status(404)
        .send("The project with the given registration was not found.");
    } else {
      response.send(project);
    }
  });
});

module.exports = router;
