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
      const { page = DefaultPage, limit = DefaultPageLimit } = request.body;
      let selections = await SelectionController.getAll({ page, limit });
      return Successful(response, selections);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      validate(request.body, SelectionController);
      let selection = await SelectionController.create(request.body);
      return Successful(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router.route("/teacher/:id").get(async (request, response) => {
  try {
    let selections = await SelectionController.getAllTeacherSelections(
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

//FEITO
router
  .route("/:id")
  .get(async (request, response) => {
    try {
      let selection = await SelectionController.getById(request.params.id);
      if (!selection) return NotFoundById(response, SELECTION);
      return Successful(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  //FEITO, mas ainda pode melhorar.
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
      return Successful(response, selection);
      
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })
//FEITO
  .delete(async (request, response) => {
    try {
      let selection = await SelectionController.remove(request.params.id);
      if (!lab) return NotFoundById(response, selection);
      return Successful(response, selection);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
