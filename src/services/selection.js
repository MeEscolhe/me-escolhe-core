"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 * @author Kelvin Cirne <kelvin.cirne.custodio@ccc.ufcg.edu.br>
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

router.route("/teacher/:id").get(async (request, response) => {
  try {
    let selections = await SelectionController.getAllTeacherSelections(
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
      return Found(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  //Ainda pode melhorar.
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
      validate(filterProps(request.body, propsToUpdate), SelectionController);
      let selection = await SelectionController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!selection) return NotFoundById(response, SELECTION);
      return Updated(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })
  .delete(async (request, response) => {
    try {
      let selection = await SelectionController.remove(request.params.id);
      if (!lab) return NotFoundById(response, selection);
      return Removed(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
