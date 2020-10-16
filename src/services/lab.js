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

router.get("/", async (request, response) => {
  const labs = LabController.getAll();
  if (isEmpty(labs)) {
    return response.status(404).send("No labs to show.");
  }
  response.send(labs);
});

router.get("/:id", async (request, response) => {
  const lab = LabController.getById(request.params.id);
  if (!lab) {
    return response
      .status(404)
      .send("The lab with the given ID was not found.");
  }
  response.send(lab);
});

router.get("/selections/:id", async (request, response) => {
  LabController.getById(request.params.id).then((lab) => {
    if (!lab) {
      return response
        .status(404)
        .send("The lab with the given ID was not found.");
    } else {
      let selections = [];
      lab.managements.forEach((projectId) => {
        ProjectController.getById(projectId).then((project) => {
          project.selections.forEach((selectionId) => {
            SelectionController.getById(selectionId).then((selection) => {
              selections.push(selection);
            });
          });
        });
      });
      response.send(selections);
    }
  });
});

router.post("/", async (request, response) => {
  const { error, message } = validate(request.body, LabController);
  if (error) {
    response.status(400).send(message);
  } else {
    const lab = await LabController.create(request.body);
    response.send(lab);
  }
});

router.put("/:id", async (request, response) => {
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
      return response
        .status(404)
        .send("The lab with the given ID was not found.");
    } else {
      response.send(lab);
    }
  }
});

router.delete("/:id", async (request, response) => {
  const lab = await LabController.remove(request.params.id);
  if (!lab) {
    return response
      .status(404)
      .send("The lab with the given ID was not found.");
  }
  response.send(lab);
});

module.exports = router;
