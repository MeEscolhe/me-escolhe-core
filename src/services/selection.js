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
    let selectionDocsList = await SelectionController.getAll({ page, limit });
    if (isEmpty(selectionDocsList.docs)) {
      return response.status(404).send("No selections to show.");
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
    return response.send(selections);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, SelectionController);
    if (error) {
      return response.status(400).send(message);
    } else {
      try {
        let selection = await SelectionController.create(request.body);
        await ProjectController.addSelection(selection, selection.projectId);
        let project = await ProjectController.getById(selection.projectId);
        let lab = await LabController.getById(project.labId);

        project = { ...project._doc, lab };
        delete project.labId;

        selection = { ...selection._doc, project };
        delete selection.projectId;
        return response.send(selection);
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    let selection = await SelectionController.getById(request.params.id);
    if (!selection) {
      return response
        .status(404)
        .send("The selection with the given ID was not found.");
    }
    let project = await ProjectController.getById(selection.projectId);
    let lab = await LabController.getById(project.labId);

    project = { ...project._doc, lab };
    delete project.labId;

    selection = { ...selection._doc, project };
    delete selection.projectId;

    return response.send(selection);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, SelectionController);
    if (error) {
      return response.status(400).send(message);
    } else {
      const propsToUpdate = [
        "role",
        "description",
        "phases",
        "current",
        "projectId",
        "skills",
      ];
      try {
        let selection = await SelectionController.update(
          request.params.id,
          filterProps(request.body, propsToUpdate)
        );
        if (!selection) {
          response
            .status(404)
            .send("The selection with the given ID was not found.");
        } else {
          let project = await ProjectController.getById(selection.projectId);
          let lab = await LabController.getById(project.labId);

          project = { ...project._doc, lab };
          delete project.labId;

          selection = { ...selection._doc, project };
          delete selection.projectId;
          return response.send(selection);
        }
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  })

  .delete(async (request, response) => {
    let selection = await SelectionController.remove(request.params.id);
    if (!selection) {
      return response
        .status(404)
        .send("The selection with the given ID was not found.");
    }
    let project = await ProjectController.getById(selection.projectId);
    let lab = await LabController.getById(project.labId);

    project = { ...project._doc, lab };
    delete project.labId;

    selection = { ...selection._doc, project };
    delete selection.projectId;

    await ProjectController.removeSelection(selection._id);
    return response.send(selection);
  });

module.exports = router;
