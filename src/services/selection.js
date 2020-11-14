"use strict";

const SelectionController = require("../controllers/selection");
const ProjectController = require("../controllers/project");
const LabController = require("../controllers/lab");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const { page = 1, limit = 10 } = request.body;
    const selections = await SelectionController.getAll({ page, limit });
    if (isEmpty(selections)) {
      response.status(404).send("No selections to show.");
    }
    selections.docs.forEach(async (selection, index) => {
      const project = await ProjectController.getById(selection.projectId);
      const lab = await LabController.getById(project.labId);
      project.lab = lab;
      selections[index].project = project;
      delete selections[index].projectId;
    });
    response.send(selections.docs);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, SelectionController);
    if (error) {
      response.status(400).send(message);
    } else {
      const selection = await SelectionController.create(request.body);
      response.send(selection);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    let selection = await SelectionController.getById(request.params.id);
    if (!selection) {
      response
        .status(404)
        .send("The selection with the given ID was not found.");
    }
    const project = await ProjectController.getById(selection.projectId);
    const lab = await LabController.getById(project.labId);
    project.lab = lab;
    selection = { ...selection._doc, project };
    delete selection.projectId;
    response.send(selection);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, SelectionController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = [
        "role",
        "description",
        "phases",
        "current",
        "projectId",
        "skills",
      ];
      const selection = await SelectionController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!selection) {
        response
          .status(404)
          .send("The selection with the given ID was not found.");
      } else {
        response.send(selection);
      }
    }
  })

  .delete(async (request, response) => {
    const selection = await SelectionController.remove(request.params.id);
    if (!selection) {
      response
        .status(404)
        .send("The selection with the given ID was not found.");
    } else {
      response.send(selection);
    }
  });

module.exports = router;
