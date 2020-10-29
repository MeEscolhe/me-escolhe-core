"use strict";

const experienceController = require("../controllers/experience");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => {
    experienceController.getAll().then((experiences) => {
      if (isEmpty(experiences)) {
        response.status(404).send("No experience to show.");
      } else {
        response.send(experiences);
      }
    });
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, experienceController);

    if (error) {
      response.status(400).send("This experience cannot be created.");
    } else {
      const experience = experienceController.create(request.body);
      response.send(experience);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    experienceController.getById(request.params.id).then((experience) => {
      if (!experience) {
        response
          .status(404)
          .send("The experience with the given ID was not found.");
      } else {
        response.send(experience);
      }
    });
  })

  .delete(async (request, response) => {
    experienceController.remove(request.params.id).then((experience) => {
      if (!experience) {
        response
          .status(404)
          .send("The experience with the given id was not found.");
      } else {
        response.send(experience);
      }
    });
  })

  .put((request, response) => {
    const { error, message } = validate(request.body, experienceController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["academic", "work"];
      experienceController
        .update(request.params.id, filterProps(request.body, propsToUpdate))
        .then((experience) => {
          if (!experience) {
            response
              .status(404)
              .send("The experience with the given ID was not found.");
          } else {
            response.send(experience);
          }
        });
    }
  });

module.exports = router;
