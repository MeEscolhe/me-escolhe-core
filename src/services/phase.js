"use strict";

const PhaseController = require("../controllers/phase");
const SelectionController = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const phases = await PhaseController.getAll();
    if (isEmpty(phases)) {
      response.status(404).send("No phases to show.");
    }
    response.send(phases);
  })

  .post("/", async (request, response) => {
    const { error, message } = validate(request.body, PhaseController);
    if (error) {
      response.status(400).send(message);
    } else {
      const phase = await PhaseController.create(request.body);
      const { selectionId } = request.body;

      const selection = await SelectionController.getById(selectionId);
      if (!selection) {
        response
          .status(404)
          .send("The selection with the given selectionId was not found.");
      } else {
        selection.phases.push(phase.id);
        await SelectionController.update(selection._id, selection);
        response.send(phase);
      }
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const phase = await PhaseController.getById(request.params.id);
    if (!phase) {
      response.status(404).send("The phases with the given ID was not found.");
    }
    response.send(phase);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, PhaseController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["students", "selectionId", "description"];
      const phase = await PhaseController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!phase) {
        response.status(404).send("The phase with the given ID was not found.");
      } else {
        response.send(phase);
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
    response.send(phases);
  });

router.route("/:id/student/:studentId").delete(async (request, response) => {
  const phase = PhaseController.removeStudent(
    request.params.id,
    request.body.studentId
  );
  response.send(phase);
});

module.exports = router;
