"use strict";

const academicExperienceController = require("../controllers/academic-experience");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const academicExperiences = await academicExperienceController.getAll();
    if (isEmpty(academicExperiences)) {
      response.status(404).send("No academic experiences to show.");
    } else {
      response.send(academicExperiences);
    }
  })

  .post(async (request, response) => {
    const { error } = validate(request.body, academicExperienceController);
    if (error) {
      response.status(400).send("This academic experience cannot be created.");
    } else {
      const academicExperience = await academicExperienceController.create(
        request.body
      );
      response.send(academicExperience);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const academicExperience = await academicExperienceController.getById(
      request.params.id
    );
    if (!academicExperience) {
      response
        .status(404)
        .send("The academic experience with the given ID was not found.");
    } else {
      response.send(academicExperience);
    }
  })

  .delete(async (request, response) => {
    const academicExperience = await academicExperienceController.remove(
      request.params.id
    );
    if (!academicExperience) {
      response
        .status(404)
        .send("The academic experience with the given id was not found.");
    } else {
      response.send(academicExperience);
    }
  })

  .put(async (request, response) => {
    const { error, message } = validate(
      request.body,
      academicExperienceController
    );
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = [
        "title",
        "category",
        "institution",
        "initialDate",
        "finalDate",
      ];
      academicExperienceController
        .update(request.params.id, filterProps(request.body, propsToUpdate))
        .then((academicExperience) => {
          if (!academicExperience) {
            response
              .status(404)
              .send("The academic experience with the given ID was not found.");
          } else {
            response.send(academicExperience);
          }
        });
    }
  });

module.exports = router;
