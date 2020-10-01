"use strict";

const PhaseController = require("../controllers/phase");
const SelectionController = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { isEmpty, validate } = require("../middlewares/util");

router.get("/", async (req, res) => {
  const phases = PhaseController.getAll();
  if (isEmpty(phases)) {
    return res.status(404).send("No phases to show.");
  }
  res.send(phases);
});

router.get("/:id", async (req, res) => {
  const phase = PhaseController.getById(req.params.id);
  if (!phase) {
    return res.status(404).send("The phases with the given ID was not found.");
  }
  res.send(phase);
});

router.post("/", async (request, response) => {
  const { error, message } = validate(request.body, PhaseController);
  if (error) {
    response.status(400).send(message);
  } else {
    const phase = await PhaseController.create(request.body);
    const { selectionId } = request.body;
    SelectionController.getById(selectionId).then((selection) => {
      if (!selection) {
        return response
          .status(404)
          .send("The selection with the given selectionId was not found.");
      } else {
        selection.phases.push(phase.id);
        SelectionController.update(selection._id, selection);
        response.send(phase);
      }
    });
  }
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const phase = PhaseController.update(req.params.id, req.body);
  if (!phase) {
    return res.status(404).send("The phases with the given ID was not found.");
  }
  res.send(phases);
});

router.delete("/:id", async (req, res) => {
  const phases = PhaseController.remove(req.params.id);
  if (!phases) {
    return res.status(404).send("The phases with the given ID was not found.");
  }
  res.send(phases);
});

module.exports = router;