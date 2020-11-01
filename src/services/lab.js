"use strict";
/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */
const LabController = require("../controllers/lab");
const ProjectController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const labs = await LabController.getAll();
    if (isEmpty(labs)) {
      response.status(404).send("No labs to show.");
    }
    response.send(labs);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, LabController);
    if (error) {
      response.status(400).send(message);
    } else {
      const lab = await LabController.create(request.body);
      response.send(lab);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const lab = await LabController.getById(request.params.id);
    if (!lab) {
      response.status(404).send("The lab with the given ID was not found.");
    }
    response.send(lab);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, LabController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["name", "description"];
      const lab = await LabController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!lab) {
        response.status(404).send("The lab with the given ID was not found.");
      } else {
        response.send(lab);
      }
    }
  })

  .delete(async (request, response) => {
    const lab = await LabController.remove(request.params.id);
    if (!lab) {
      response.status(404).send("The lab with the given ID was not found.");
    }
    response.send(lab);
  });

router.route("/selections/:id").get(async (request, response) => {
  const lab = await LabController.getById(request.params.id);
  if (!lab) {
    response.status(404).send("The lab with the given ID was not found.");
  } else {
    let selections = [];
    lab.managements.forEach(async (projectId) => {
      const project = await ProjectController.getById(projectId);
      project.selections.forEach(async (selectionId) => {
        const selection = await SelectionController.getById(selectionId);
        selections.push(selection);
      });
    });
    response.send(selections);
  }
});

module.exports = router;
