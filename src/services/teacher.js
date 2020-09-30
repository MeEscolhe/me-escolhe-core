"use strict";
/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */
const TeacherController = require("../controllers/teacher");
const ProjectController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");
const selection = require("../models/selection");

router.get("/", async (req, res) => {
  const teachers = TeacherController.getAll();
  if (isEmpty(teachers)) {
    return res.status(404).send("No teachers to show.");
  }
  res.send(teachers);
});

router.get("/:id", async (req, res) => {
  const teacher = TeacherController.getById(req.params.id);
  if (!teacher) {
    return res.status(404).send("The teacher with the given ID was not found.");
  }
  res.send(teacher);
});

router.get("/selections/:id", async (request, response) => {
  TeacherController.getById(request.params.id).then((teacher) => {
    if (!teacher) {
      return response
        .status(404)
        .send("The teacher with the given ID was not found.");
    } else {
      let selections = [];
      teacher.managements.forEach((projectId) => {
        ProjectController.getById(projectId).then((project) => {
          project.selections.forEach((selectionId) => {
            SelectionController.getById(selectionId).then((selection) => {
              selections.push(selection);
            });
          });
        });
      });
      response.send(selections);
    }
  });
});

router.post("/", async (req, res) => {
  const teacher = TeacherController.create(req.body);
  res.send(teacher);
});

router.put("/:id", async (req, res) => {
  const teacher = TeacherController.update(req.params.id, req.body);
  if (!teacher) {
    return res.status(404).send("The teacher with the given ID was not found.");
  }
  res.send(teacher);
});

router.delete("/:id", async (req, res) => {
  const teacher = TeacherController.remove(req.params.id);
  if (!teacher) {
    return res.status(404).send("The teacher with the given ID was not found.");
  }
  res.send(teacher);
});

module.exports = router;
