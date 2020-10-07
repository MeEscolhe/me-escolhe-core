"use strict";

const hardCtrl = require("../controllers/hard");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = hardCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const hards = hardCtrl.getAll();
  if (isEmpty(hards)) {
    return res.status(404).send("No hard skills to show.");
  }
  res.send(hards);
});

router.get("/:id", async (req, res) => {
  const hard = hardCtrl.getById(req.params.id);
  if (!hard) {
    return res.status(404).send("The hard with the given ID was not found.");
  }
  res.send(hard);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const hard = hardCtrl.create(req.body);
  res.send(hard);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const hard = hardCtrl.update(req.params.id, req.body);
  if (!hard) {
    return res.status(404).send("The hard with the given ID was not found.");
  }
  res.send(hard);
});

router.delete("/:id", async (req, res) => {
  const hard = hardCtrl.remove(req.params.id);
  if (!hard) {
    return res
      .status(404)
      .send("The hard skills with the given ID was not found.");
  }
  res.send(hard);
});

module.exports = router;
