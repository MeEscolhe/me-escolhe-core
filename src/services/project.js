"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const PROJECT = "project";

const ProjectController = require("../controllers/project");
const { isEmpty, validate, filterProps } = require("../middlewares/utils");
const {
  Successful,
  NotFound,
  NotFoundById,
  UnexpectedError,
} = require("../middlewares/rest-middleware");
const router = require("express").Router();

router
  .route("/")
  .get(async (request, response) => {
    try {
      let projects = await ProjectController.getAll();
      if (isEmpty(projects)) return NotFound(response, PROJECT);
      return Successful(response, projects);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      validate(request.body, ProjectController);
      let project = await ProjectController.create(request.body);
      return Successful(response, project);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    try {
      let project = await ProjectController.getById(request.params.id);
      if (!project) return NotFound(response, PROJECT);
      return Successful(response, project);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .put(async (request, response) => {
    try {
      validate(request.body, ProjectController);
      const project = await ProjectController.update(
        request.params.id,
        request.body
      );
      if (!project) return NotFoundById(response, PROJECT);
      return Successful(response, project);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router.route("/:id").delete(async (request, response) => {
  try {
    const project = await ProjectController.remove(request.params.id);
    if (!project) return NotFoundById(response, PROJECT);
    return Successful(response, project);
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

module.exports = router;
