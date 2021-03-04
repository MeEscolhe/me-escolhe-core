"use strict";

const TeacherController = require("../controllers/teacher");
const ProjectController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const CredentialController = require("../controllers/credential");
const express = require("express");
const router = express.Router();
const { validate, isEmpty, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const teachers = await TeacherController.getAll();
    if (isEmpty(teachers)) {
      return response.status(404).send("No teachers to show.");
    } else {
      return response.send(teachers);
    }
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, TeacherController);
    if (error) {
      return response.status(400).send(message);
    } else {
      try {
        const teacher = await TeacherController.create(request.body);
        await CredentialController.create(request.body, true);
        return response.send(teacher);
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  });

router.route("/email").get(async (request, response) => {
  const teacher = await TeacherController.getByEmail(request.body.email);
  if (!teacher) {
    return response
      .status(404)
      .send("The teacher with the given email was not found.");
  } else {
    return response.send(teacher);
  }
});

router
  .route("/:id")
  .get(async (request, response) => {
    const teacher = await TeacherController.getById(request.params.id);
    if (!teacher) {
      return response
        .status(404)
        .send("The teacher with the given ID was not found.");
    } else {
      return response.send(teacher);
    }
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, TeacherController);
    if (error) {
      return response.status(400).send(message);
    } else {
      const propsToUpdate = [
        "name",
        "email",
        "password",
        "description",
        "labId",
        "managements",
      ];
      const teacher = await TeacherController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!teacher) {
        response
          .status(404)
          .send("The teacher with the given ID was not found.");
      } else {
        return response.send(teacher);
      }
    }
  })

  .delete(async (request, response) => {
    const teacher = await TeacherController.remove(request.params.id);
    if (!teacher) {
      return response
        .status(404)
        .send("The teacher with the given ID was not found.");
    } else {
      return response.send(teacher);
    }
  });

router.route("/:id/selections").get(async (request, response) => {
  const teacher = await TeacherController.getById(request.params.id);
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
    return response.send(selectionsByTeacher);
  }
});

module.exports = router;
