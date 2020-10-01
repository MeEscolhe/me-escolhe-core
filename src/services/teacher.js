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
  TeacherController.getById(request.params.id).then(async (teacher) => {
    if (!teacher) {
      return response
        .status(404)
        .send("The teacher with the given ID was not found.");
    } else {
      let selectionsByTeacher = [];
      const managements = teacher.managements;
      for (let i = 0; i < managements.length; i++) {
        const projectId = managements[i];
        const project = await ProjectController.getById(projectId);
        const selections = project.selections;
        for (let j = 0; j < selections.length; j++) {
          const selectionId = selections[j];
          const selection = await SelectionController.getById(selectionId);
          selectionsByTeacher.push(selection);
        }
      }
      response.send(selectionsByTeacher);
    }
  });
});

router.post("/", async (req, res) => {
  const teacher = await TeacherController.create(req.body);
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
