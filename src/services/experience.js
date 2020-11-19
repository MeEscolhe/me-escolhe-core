"use strict";

const experienceController = require("../controllers/experience");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const experiences = await experienceController.getAll();
    if (isEmpty(experiences)) {
      response.status(404).send("No experience to show.");
    } else {
      response.send(experiences);
    }
  })

  .post(async (request, response) => {
    const { error } = validate(request.body, experienceController);
    if (error) {
      response.status(400).send("This experience cannot be created.");
    } else {
      const experience = await experienceController.create(request.body);
      response.send(experience);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const experience = await experienceController.getById(request.params.id);
    if (!experience) {
      response
        .status(404)
        .send("The experience with the given ID was not found.");
    } else {
      response.send(experience);
    }
  })

  .delete(async (request, response) => {
    const experience = await experienceController.remove(request.params.id);
    if (!experience) {
      response
        .status(404)
        .send("The experience with the given id was not found.");
    } else {
      response.send(experience);
    }
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, experienceController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["academic", "work"];
      try {
        const experience = await experienceController.update(
          request.params.id,
          filterProps(request.body, propsToUpdate)
        );
        if (!experience) {
          response
            .status(404)
            .send("The experience with the given ID was not found.");
        } else {
          response.send(experience);
        }
      } catch (error) {
        response.status(400).send(error.message);
      }
    }
  });

module.exports = router;
