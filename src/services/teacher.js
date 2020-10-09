"use strict";

const TeacherController = require("../controllers/teacher");
const ProjectController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { validate, isEmpty, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => {
    TeacherController.getAll().then((teachers) => {
      if (isEmpty(teachers)) {
        response.status(404).send("No teachers to show.");
      } else {
        response.send(teachers);
      }
    });
  })
  .post(async (request, response) => {
    const { error, message } = validate(request.body, TeacherController);

    if (error) {
      response.status(400).send(message);
    } else {
      const teacher = TeacherController.create(request.body);
      response.send(teacher);
    }
  });


router.get("/:id", async (request, response) => {
  TeacherController.getById(
    request.params.id
  ).then((teacher) => {
    if (!teacher) {
      response.status(404).send("The teacher with the given ID was not found.");
    } else {
      response.send(teacher);
    }
  });
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


router.put("/:id", (request, response) => {
  const identifier = request.params.id;
  const { error, message } = validate(
    { identifier, ...request.body },
    TeacherController
  );
  if (error) {
    response.status(400).send(message);
  } else {
    const {name, email, description, labId, managements, feedbackRequests} = request.body;

    TeacherController.update(
      request.params.id,
      filterProps({name, email, description, labId, managements, feedbackRequests})//editar
    ).then((teacher) => {
      if (!teacher) {
        response
          .status(404)
          .send("The teacher with the given ID was not found.");
      } else {
        response.send(teacher);
      }
    });
  }
});

router.delete("/:id", async (req, res) => {
  const teacher = TeacherController.remove(req.params.id);
  if (!teacher) {
    return res.status(404).send("The teacher with the given ID was not found.");
  }
  res.send(teacher);
});

module.exports = router;
