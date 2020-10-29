"use strict";

const workExperienceController = require("../controllers/work-experience");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => {
    workExperienceController.getAll().then((workExperiences) => {
      if (isEmpty(workExperiences)) {
        response.status(404).send("No work experiences to show.");
      } else {
        response.send(workExperiences);
      }
    });
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, workExperienceController);

    if (error) {
      response.status(400).send("This work experience cannot be created.");
    } else {
      const workExperience = workExperienceController.create(request.body);
      response.send(workExperience);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    workExperienceController
      .getById(request.params.id)
      .then((workExperience) => {
        if (!workExperience) {
          response
            .status(404)
            .send("The work experience with the given ID was not found.");
        } else {
          response.send(workExperience);
        }
      });
  })

  .delete(async (request, response) => {
    workExperienceController
      .remove(request.params.id)
      .then((workExperience) => {
        if (!workExperience) {
          response
            .status(404)
            .send("The work experience with the given id was not found.");
        } else {
          response.send(workExperience);
        }
      });
  })
  .put((request, response) => {
    const { error, message } = validate(request.body, workExperienceController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["role", "institution", "durationInMonths"];
      workExperienceController
        .update(request.params.id, filterProps(request.body, propsToUpdate))
        .then((workExperience) => {
          if (!workExperience) {
            response
              .status(404)
              .send("The academic experience with the given ID was not found.");
          } else {
            response.send(workExperience);
          }
        });
    }
  });

module.exports = router;
