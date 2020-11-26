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
      return response.status(404).send("No labs to show.");
    }
    return response.send(labs);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, LabController);
    if (error) {
      return response.status(400).send(message);
    } else {
      const lab = await LabController.create(request.body);
      return response.send(lab);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const lab = await LabController.getById(request.params.id);
    if (!lab) {
      return response
        .status(404)
        .send("The lab with the given ID was not found.");
    }
    return response.send(lab);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, LabController);
    if (error) {
      return response.status(400).send(message);
    } else {
      const propsToUpdate = ["name", "description"];
      const lab = await LabController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!lab) {
        return response
          .status(404)
          .send("The lab with the given ID was not found.");
      } else {
        return response.send(lab);
      }
    }
  })

  .delete(async (request, response) => {
    try {
      const lab = await LabController.remove(request.params.id);
      if (!lab) {
        return response
          .status(404)
          .send("The lab with the given ID was not found.");
      }
      return response.send(lab);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  });

router.route("/selections/:id").get(async (request, response) => {
  const lab = await LabController.getById(request.params.id);
  if (!lab) {
    return response
      .status(404)
      .send("The lab with the given ID was not found.");
  } else {
    let selections = [];
    lab.managements.forEach(async (projectId) => {
      const project = await ProjectController.getById(projectId);
      project.selections.forEach(async (selectionId) => {
        const selection = await SelectionController.getById(selectionId);
        selections.push(selection);
      });
    });
    return response.send(selections);
  }
});

module.exports = router;
