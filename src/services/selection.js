"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const SELECTION = "selection";

const SelectionController = require("../controllers/selection");
const ProjectController = require("../controllers/project");
const LabController = require("../controllers/lab");
const { validate, filterProps } = require("../middlewares/utils");
const {
  Successful,
  NotFound,
  NotFoundById,
  UnexpectedError,
} = require("../middlewares/rest-middleware");
const router = require("express").Router();
router
  .route("/")
  .get(async (request, response) => {
    // TO-DO: DIVIDIR ESSE ENDPOINT EM 3
    // POIS ENDPOINTS DEVEM SER MODULARIZADOS
    // (HÁ 3 CONTEXTOS AQUI)
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
      return Successful(response, selections.reverse());
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      request.body.phases = [];
      const { error } = validate(request.body, SelectionController);
      if (error) return UnexpectedError(response, error);
      let selection = await SelectionController.create(request.body);
      await ProjectController.addSelection(selection, selection.projectId);
      let project = await ProjectController.getById(selection.projectId);
      let lab = await LabController.getById(project.labId);

      project = { ...project._doc, lab };
      delete project.labId;

      selection = { ...selection._doc, project };
      delete selection.projectId;
      return Successful(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    try {
      let selection = await SelectionController.getById(request.params.id);
      if (!selection) return NotFoundById(response, SELECTION);
      let project = await ProjectController.getById(selection.projectId);
      let lab = await LabController.getById(project.labId);

      project = { ...project._doc, lab };
      delete project.labId;

      selection = { ...selection, project };
      delete selection.projectId;

      return Successful(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .put(async (request, response) => {
    const { error } = validate(request.body, SelectionController);
    if (error) return UnexpectedError(response, error);
    try {
      const propsToUpdate = [
        "role",
        "description",
        "phases",
        "current",
        "projectId",
        "skills",
      ];
      let selection = await SelectionController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!selection) return NotFoundById(response, SELECTION);
      let project = await ProjectController.getById(selection.projectId);
      let lab = await LabController.getById(project.labId);

      project = { ...project._doc, lab };
      delete project.labId;

      selection = { ...selection._doc, project };
      delete selection.projectId;
      return Succesful(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    try {
      let selection = await SelectionController.remove(request.params.id);
      if (!selection) return UnexpectedError(response, error);
      let project = await ProjectController.getById(selection.projectId);
      let lab = await LabController.getById(project.labId);

      project = { ...project._doc, lab };
      delete project.labId;

      selection = { ...selection._doc, project };
      delete selection.projectId;

      await ProjectController.removeSelection(selection._id);
      return Succesful(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
