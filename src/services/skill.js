"use strict";

const skillCtrl = require("../controllers/skill");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = skillCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const skills = skillCtrl.getAll();
  if (isEmpty(skills)) {
    return res.status(404).send("No skills to show.");
  }
  res.send(skills);
});

router.get("/:id", async (req, res) => {
  const skill = skillCtrl.getById(req.params.id);
  if (!skill) {
    return res.status(404).send("The skill with the given ID was not found.");
  }
  res.send(skill);
});

router.post("/", async (req, res) => {
  validate(req.body);
  let skill = skillCtrl.create(req.body);
  res.send(skill);
});

router.put("/:id", async (req, res) => {
  const skill = skillCtrl.update(req.params.id, req.body);
  if (!skill) {
    return res.status(404).send("The skill with the given ID was not found.");
  }
  res.send(skill);
});

router.delete("/:id", async (req, res) => {
  const skill = skillCtrl.remove(req.params.id);
  if (!skill) {
    return res.status(404).send("The skill with the given ID was not found.");
  }
  res.send(skill);
});

module.exports = router;