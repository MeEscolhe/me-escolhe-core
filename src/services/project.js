"use strict";

const projectCtrl = require("../controllers/project");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = languageCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const projects = projectCtrl.getAll();
  if (isEmpty(projects)) {
    return res.status(404).send("No projects to show.");
  }
  res.send(projects);
});

router.get("/:id", async (req, res) => {
  const project = projectCtrl.getById(req.params.id);
  if (!project) {
    return res.status(404).send("The project with the given ID was not found.");
  }
  res.send(project);
});

router.post("/", async (req, res) => {
  validate(req.body);
  let project = projectCtrl.create(req.body);
  res.send(project);
});

router.put("/:id", async (req, res) => {
  const project = projectCtrl.update(req.params.id, req.body.name);
  if (!project) {
    return res.status(404).send("The project with the given ID was not found.");
  }
  res.send(project);
});

router.delete("/:id", async (req, res) => {
  const project = projectCtrl.remove(req.params.id);
  if (!project) {
    return res.status(404).send("The project with the given ID was not found.");
  }
  res.send(project);
});

module.exports = router;
