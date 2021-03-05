"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const PhaseController = require("../controllers/phase");
const SelectionController = require("../controllers/selection");
const { isEmpty, validate, filterProps } = require("../middlewares/util");
const router = require("express").Router();

router
  .route("/")
  .get(async (request, response) => {
    const phases = await PhaseController.getAll();
    if (isEmpty(phases)) {
      return response.status(404).send("No phases to show.");
    }
    return response.send(phases);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, PhaseController);
    if (error) {
      return response.status(400).send(message);
    } else {
      const phase = await PhaseController.create(request.body);
      const { selectionId } = request.body;
      try {
        const selection = await SelectionController.getById(selectionId);
        if (!selection) {
          response
            .status(404)
            .send("The selection with the given selectionId was not found.");
        } else {
          selection.phases.push(phase.id);
          await SelectionController.update(selection._id, selection);
          return response.send(phase);
        }
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const phase = await PhaseController.getById(request.params.id);
    if (!phase) {
      return response
        .status(404)
        .send("The phases with the given ID was not found.");
    }
    return response.send(phase);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, PhaseController);
    if (error) {
      return response.status(400).send(message);
    } else {
      const propsToUpdate = ["students", "selectionId", "description"];
      try {
        const phase = await PhaseController.update(
          request.params.id,
          filterProps(request.body, propsToUpdate)
        );
        if (!phase) {
          response
            .status(404)
            .send("The phase with the given ID was not found.");
        } else {
          return response.send(phase);
        }
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  })

  .delete(async (request, response) => {
    const phases = await PhaseController.remove(request.params.id);
    if (!phases) {
      return response
        .status(404)
        .send("The phases with the given ID was not found.");
    }
    return response.send(phases);
  });

router
  .route("/:id/student/:registration")
  .post(async (request, response) => {
    try {
      const phase = await PhaseController.addStudent(
        request.params.id,
        request.params.registration
      );
      return response.send(phase);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  })

  .delete(async (request, response) => {
    try {
      const phase = await PhaseController.removeStudent(
        request.params.id,
        request.params.registration
      );
      return response.send(phase);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  });

module.exports = router;
