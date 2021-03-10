"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const TeacherController = require("../controllers/teacher");
const ProjectController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const CredentialController = require("../controllers/credential");
const { validate, isEmpty, filterProps } = require("../middlewares/utils");
const {
  Found,
  Created,
  Updated,
  Removed,
  NotFound,
  NotFoundById,
  UnexpectedError,
  NotFoundByEmail,
} = require("../middlewares/rest-middleware");
const router = require("express").Router();

const TEACHER = "teacher";

router
  .route("/")
  .get(async (request, response) => {
    const teachers = await TeacherController.getAll();
    if (isEmpty(teachers)) return NotFound(response, TEACHER);
    return Found(response, teachers);
  })

  .post(async (request, response) => {
    try {
      const { password, ...teacher } = request.body;
      const { error } = validate(teacher, TeacherController);
      if (error) return UnexpectedError(response, error);
      const createdTeacher = await TeacherController.create(teacher);
      await CredentialController.create(request.body, true);
      return Created(response, createdTeacher);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router.route("/email").get(async (request, response) => {
  try {
    const teacher = await TeacherController.getByEmail(request.body.email);
    if (!teacher) return NotFoundByEmail(response, TEACHER);
    return Found(response, teacher);
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

router
  .route("/:id")
  .get(async (request, response) => {
    try {
      const teacher = await TeacherController.getById(request.params.id);
      if (!teacher) return NotFoundById(response, TEACHER);
      return Found(response, teacher);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .put(async (request, response) => {
    try {
      const { error } = validate(request.body, TeacherController);
      if (error) return UnexpectedError(response, error);
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
      if (!teacher) return NotFoundById(response, TEACHER);
      return Updated(response, teacher);
    } catch (error) {
      return UnexpectedError(error);
    }
  })

  .delete(async (request, response) => {
    try {
      const teacher = await TeacherController.remove(request.params.id);
      if (!teacher) return NotFoundById(response, TEACHER);
      return Removed(teacher);
    } catch (error) {
      return NotFoundById(response, error);
    }
  });

router.route("/:id/selections").get(async (request, response) => {
  try {
    const teacher = await TeacherController.getById(request.params.id);
    if (!teacher) return NotFoundById(response, TEACHER);
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
    return Found(response, selectionsByTeacher);
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

module.exports = router;
