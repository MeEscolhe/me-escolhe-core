"use strict";

const softCtrl = require("../controllers/soft");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = softCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const softs = softCtrl.getAll();
  if (isEmpty(softs)) {
    return res.status(404).send("No soft skills to show.");
  }
  res.send(softs);
});

router.get("/:id", async (req, res) => {
  const soft = softCtrl.getById();
  if (!soft) {
    return res
      .status(404)
      .send("The soft skill with the given ID was not found.");
  }
  res.send(soft);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const soft = softCtrl.create(req.body);
  res.send(soft);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const soft = softCtrl.update(req.params.id, req.body);
  if (!soft) {
    return res
      .status(404)
      .send("The soft skill with the given ID was not found.");
  }
  res.send(soft);
});

router.delete("/:id", async (req, res) => {
  const soft = softCtrl.remove(req.params.id);
  if (!soft) {
    return res
      .status(404)
      .send("The soft skill with the given ID was not found.");
  }
  res.send(soft);
});

module.exports = router;
