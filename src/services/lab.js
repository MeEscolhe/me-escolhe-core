"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const LAB = "lab";

const LabController = require("../controllers/lab");
const ProjectController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const { isEmpty, validate } = require("../middlewares/utils");
const {
  Found,
  Created,
  Updated,
  Removed,
  NotFound,
  NotFoundById,
  UnexpectedError,
} = require("../middlewares/rest-middleware");
const router = require("express").Router();

router
  .route("/")
  .get(async (request, response) => {
    try {
      const labs = await LabController.getAll();
      if (isEmpty(labs)) return NotFound(response, LAB);
      return Found(response, labs);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      validate(request.body, LabController);
      const lab = await LabController.create(request.body);
      return Created(response, lab);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    try {
      const lab = await LabController.getById(request.params.id);
      if (!lab) return NotFoundById(response, LAB);
      return Found(response, lab);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .put(async (request, response) => {
    try {
      validate(request.body, LabController);
      const lab = await LabController.update(request.params.id, request.body);
      if (!lab) return NotFoundById(response, LAB);
      return Updated(response, lab);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    try {
      const lab = await LabController.remove(request.params.id);
      if (!lab) return NotFoundById(response, LAB);
      return Removed(response, lab);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

// TO-DO: FALTA ESSA DESGRAÇA AQUI. MELHOR DEIXAR POR ÚLTIMO

router.route("/selections/:id").get(async (request, response) => {
  try {
    const lab = await LabController.getById(request.params.id);
    if (!lab) return NotFoundById(response, LAB);
    let selections = [];
    lab.managements.forEach(async (projectId) => {
      const project = await ProjectController.getById(projectId);
      project.selections.forEach(async (selectionId) => {
        const selection = await SelectionController.getById(selectionId);
        selections.push(selection);
      });
    });
    return Successful(response, selections);
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

module.exports = router;
