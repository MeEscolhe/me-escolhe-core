"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const PHASE = "phase";

const PhaseController = require("../controllers/phase");
const SelectionController = require("../controllers/selection");
const { isEmpty, validate, filterProps } = require("../middlewares/utils");
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
      const phases = await PhaseController.getAll();
      if (isEmpty(phases)) return NotFound(response, PHASE);
      return Successful(response, phases);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    const { error } = validate(request.body, PhaseController);
    if (error) return UnexpectedError(error);
    const phase = await PhaseController.create(request.body);
    const { selectionId } = request.body;
    try {
      const selection = await SelectionController.getById(selectionId);
      if (!selection) return NotFoundById(response, PHASE);
      selection.phases.push(phase.id);
      await SelectionController.update(selection._id, selection);
      return Successful(response, phase);
    } catch (error) {
      return UnexpectedError(error);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    try {
      const phase = await PhaseController.getById(request.params.id);
      if (!phase) return NotFoundById(response, PHASE);
      return Successful(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .put(async (request, response) => {
    const { error } = validate(request.body, PhaseController);
    if (error) return UnexpectedError(response, error);
    try {
      const propsToUpdate = ["students", "selectionId", "description"];
      const phase = await PhaseController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!phase) return NotFoundById(response, PHASE);
      return Successful(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    try{
      const phases = await PhaseController.remove(request.params.id);
      if (!phases) return NotFoundById(response, PHASE);
      return Successful(response, phases);
    } catch (error) {
      return UnexpectedError(response, error);
    }
    
  });

router
  .route("/:id/student/:registration")
  .post(async (request, response) => {
    try {
      const phase = await PhaseController.addStudent(
        request.params.id,
        request.params.registration
      );
      return Successful(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    try {
      const phase = await PhaseController.removeStudent(
        request.params.id,
        request.params.registration
      );
      return Successful(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
