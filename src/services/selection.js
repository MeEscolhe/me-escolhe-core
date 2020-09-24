"use strict";

const selectionCtrl = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = selectionCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const selections = selectionCtrl.getAll();
  if (isEmpty(selections)) {
    return res.status(404).send("No selections to show.");
  }
  res.send(selections);
});

router.get("/:id", async (req, res) => {
  const selection = selectionCtrl.getById(req.params.id);
  if (!selection) {
    return res
      .status(404)
      .send("The selection with the given ID was not found.");
  }
  res.send(selection);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const selection = selectionCtrl.create(req.body);
  res.send(selection);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const selection = selectionCtrl.update(req.params.id, req.body.role);
  if (!selection) {
    return res
      .status(404)
      .send("The selection with the given ID was not found.");
  }
  res.send(selection);
});

router.delete("/:id", async (req, res) => {
  const selection = selectionCtrl.remove(req.params.id);
  if (!selection) {
    return res
      .status(404)
      .send("The selection with the given ID was not found.");
  }
  res.send(selection);
});

module.exports = router;
