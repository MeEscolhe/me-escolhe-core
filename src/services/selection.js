"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const SELECTION = "selection";

const SelectionController = require("../controllers/selection");
const ProjectController = require("../controllers/project");
const LabController = require("../controllers/lab");
const {
  DefaultPageLimit,
  DefaultPage,
} = require("../providers/default-values-provider");
const { validate, filterProps } = require("../middlewares/utils");
const {
  Found,
  Created,
  Updated,
  Removed,
  NotFoundById,
  UnexpectedError,
} = require("../middlewares/rest-middleware");
const router = require("express").Router();
router
  .route("/")
  .get(async (request, response) => {
    try {
      const { page = DefaultPage, limit = DefaultPageLimit } = request.body;
      const selections = await SelectionController.getAll({ page, limit });
      return Found(response, selections);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      validate(request.body, SelectionController);
      const selection = await SelectionController.create(request.body);
      return Created(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

// TO-DO: FALTA TUDO DAQUI PRA BAIXO !!!

router.route("/teacher/:id").get(async (request, response) => {
  try {
    const selections = await SelectionController.getAllTeacherSelections(
      request.params.id
    );
    return Found(response, selections.reverse());
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

router.route("/student/:id").get(async (request, response) => {
  try {
    const selections = await SelectionController.getAllStudentSelections(
      request.params.id
    );
    return Found(response, selections.reverse());
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

      return Found(response, selection);
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
      return Updated(response, selection);
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
      return Removed(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
