"use strict";

const phaseCtrl = require("../controllers/phase");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = languageCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const phases = phaseCtrl.getAll();
  if (isEmpty(phases)) {
    return res.status(404).send("No phases to show.");
  }
  res.send(phases);
});

router.get("/:id", async (req, res) => {
  const phase = phaseCtrl.getById(req.params.id);
  if (!phase) {
    return res.status(404).send("The phases with the given ID was not found.");
  }
  res.send(phase);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const phase = phaseCtrl.create(req.body);
  res.send(phases);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const phase = phaseCtrl.update(req.params.id, req.body);
  if (!phase) {
    return res.status(404).send("The phases with the given ID was not found.");
  }
  res.send(phases);
});

router.delete("/:id", async (req, res) => {
  const phases = phaseCtrl.remove(req.params.id);
  if (!phases) {
    return res.status(404).send("The phases with the given ID was not found.");
  }
  res.send(phases);
});

module.exports = router;
