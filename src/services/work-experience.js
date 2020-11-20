"use strict";

const workExperienceController = require("../controllers/work-experience");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const workExperiences = await workExperienceController.getAll();
    if (isEmpty(workExperiences)) {
      return response.status(404).send("No work experiences to show.");
    } else {
      return response.send(workExperiences);
    }
  })

  .post(async (request, response) => {
    const { error } = validate(request.body, workExperienceController);
    if (error) {
      return response
        .status(400)
        .send("This work experience cannot be created.");
    } else {
      const workExperience = await workExperienceController.create(
        request.body
      );
      return response.send(workExperience);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const workExperience = await workExperienceController.getById(
      request.params.id
    );
    if (!workExperience) {
      response
        .status(404)
        .send("The work experience with the given ID was not found.");
    } else {
      return response.send(workExperience);
    }
  })

  .delete(async (request, response) => {
    const workExperience = await workExperienceController.remove(
      request.params.id
    );
    if (!workExperience) {
      response
        .status(404)
        .send("The work experience with the given id was not found.");
    } else {
      return response.send(workExperience);
    }
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, workExperienceController);
    if (error) {
      return response.status(400).send(message);
    } else {
      const propsToUpdate = ["role", "institution", "initialDate", "finalDate"];
      const workExperience = await workExperienceController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!workExperience) {
        response
          .status(404)
          .send("The academic experience with the given ID was not found.");
      } else {
        return response.send(workExperience);
      }
    }
  });

module.exports = router;
