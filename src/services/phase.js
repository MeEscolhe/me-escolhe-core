"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const PHASE = "phase";

const PhaseController = require("../controllers/phase");
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
      const phases = await PhaseController.getAll();
      if (isEmpty(phases)) return NotFound(response, PHASE);
      return Found(response, phases);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      validate(request.body, PhaseController);
      const phase = await PhaseController.create(request.body);
      return Created(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    try {
      const phase = await PhaseController.getById(request.params.id);
      if (!phase) return NotFoundById(response, PHASE);
      return Found(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .put(async (request, response) => {
    try {
      validate(request.body, PhaseController);
      const phase = await PhaseController.update(
        request.params.id,
        request.body
      );
      if (!phase) return NotFoundById(response, PHASE);
      return Updated(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    const phases = await PhaseController.remove(request.params.id);
    if (!phases) return NotFoundById(response, PHASE);
    return Removed(response, phases);
  });

router
  .route("/:id/student/:registration")
  .post(async (request, response) => {
    try {
      const { id, registration } = request.params;
      const phase = await PhaseController.addStudent(id, registration);
      return Created(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    try {
      const { id, registration } = request.params;
      const phase = await PhaseController.removeStudent(id, registration);
      return Removed(response, phase);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
