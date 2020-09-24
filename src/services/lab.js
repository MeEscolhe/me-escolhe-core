"use strict";

const labCtrl = require("../controllers/lab");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = labCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const labs = labCtrl.getAll();
  if (isEmpty(labs)) {
    return res.status(404).send("No labs to show.");
  }
  res.send(labs);
});

router.get("/:id", async (req, res) => {
  const lab = labCtrl.getById(req.params.id);
  if (!lab) {
    return res.status(404).send("The lab with the given ID was not found.");
  }
  res.send(lab);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const lab = labCtrl.create(req.body);
  res.send(lab);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const lab = labCtrl.update(req.params.id, req.body);
  if (!lab) {
    return res.status(404).send("The lab with the given ID was not found.");
  }
  res.send(lab);
});

router.delete("/:id", async (req, res) => {
  const lab = await labCtrl.remove(req.params.id);
  if (!lab) {
    return res.status(404).send("The lab with the given ID was not found.");
  }
  res.send(lab);
});

module.exports = router;
