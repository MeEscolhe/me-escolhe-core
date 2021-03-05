"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const PROJECT = "project";

const ProjectController = require("../controllers/project");
const LabController = require("../controllers/lab");
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
      for (let i = 0; i < projects.length; i++) {
        const lab = await LabController.getById(projects[i].labId);
        projects[i] = { ...projects[i]._doc, lab };
        delete projects[i].labId;
      }
      return Successful(response, projects);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      request.body.selections = [];
      const { error } = validate(request.body, ProjectController);
      if (error) return UnexpectedError(response, error);
      let project = await ProjectController.create(request.body);
      const lab = await LabController.getById(project.labId);
      project = { ...project._doc, lab };
      delete project.labId;
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
      const lab = await LabController.getById(project.labId);
      project = { ...project._doc, lab };
      delete project.labId;
      return Successful(response, project);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .put(async (request, response) => {
    try {
      const { error } = validate(request.body, ProjectController);
      if (error) return UnexpectedError(response, error);
      const propsToUpdate = ["name", "description", "labId", "selections"];
      let project = await ProjectController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!project) return NotFoundById(response, project);
      const lab = await LabController.getById(project.labId);
      project = { ...project._doc, lab };
      delete project.labId;
      return Successful(response, project);
    } catch (error) {
      return Successful(response, error);
    }
  });

router.route("/:id").delete(async (request, response) => {
  try {
    const project = await ProjectController.remove(request.params.id);
    if (!project) return NotFoundById(response, project);
    return Successful(project);
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

module.exports = router;
