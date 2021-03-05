"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const SelectionController = require("../controllers/selection");
const ProjectController = require("../controllers/project");
const LabController = require("../controllers/lab");
const { validate, filterProps } = require("../middlewares/utils");
const router = require("express").Router();
router
  .route("/")
  .get(async (request, response) => {
    try {
      const { type, id } = request.query;
      let selections;
      if (type === "all" || !id) {
        const { page = 1, limit = 10 } = request.body;
        selections = await SelectionController.getAll({ page, limit });
      } else if (type === "teacher" && id && id !== "") {
        selections = await SelectionController.getAllTeacherSelections(id);
      } else if (type === "student" && id && id !== "") {
        selections = await SelectionController.getAllStudentSelections(id);
      } else {
        return response
          .status(400)
          .send(
            "need Type as => [teacher,student] given type (" +
              type +
              ") need id, given id (" +
              id +
              ")"
          );
      }
      return response.send(selections.reverse());
    } catch (error) {
      return response.status(400).send(error.message);
    }
  })

  .post(async (request, response) => {
    request.body.phases = [];
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
    try {
      let selection = await SelectionController.getById(request.params.id);
      if (!selection) {
        response
          .status(404)
          .send("The selection with the given ID was not found.");
      }
      let project = await ProjectController.getById(selection.projectId);
      let lab = await LabController.getById(project.labId);

      project = { ...project._doc, lab };
      delete project.labId;

      selection = { ...selection, project };
      delete selection.projectId;

      return response.send(selection);
    } catch (error) {
      return response.status(400).send(error.message);
    }
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
