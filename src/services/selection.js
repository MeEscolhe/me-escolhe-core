"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const SELECTION = "selection";

const SelectionController = require("../controllers/selection");
const ProjectController = require("../controllers/project");
const LabController = require("../controllers/lab");
const {
  DefaultLimit,
  DefaultPage,
} = require("../middlewares/default-values-provider");
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
    try {
      const { page = DefaultPage, limit = DefaultLimit } = request.body;
      const selections = await SelectionController.getAll({ page, limit });
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

router.route("/teacher/:id").get(async (request, response) => {
  try {
    const selections = await SelectionController.getAllTeacherSelections(
      request.params.id
    );
    return Successful(response, selections.reverse());
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

router.route("/student/:id").get(async (request, response) => {
  try {
    const selections = await SelectionController.getAllStudentSelections(
      request.params.id
    );
    return Successful(response, selections.reverse());
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
