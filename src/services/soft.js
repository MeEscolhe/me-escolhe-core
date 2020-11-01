"use strict";

const softSkillController = require("../controllers/soft");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const softSkills = await softSkillController.getAll();
    if (isEmpty(softSkills)) {
      response.status(404).send("No soft skills to show.");
    } else {
      response.send(softSkills);
    }
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, softSkillController);
    if (error) {
      response.status(400).send("This soft skill cannot be created.");
    } else {
      const softSkill = await softSkillController.create(request.body);
      response.send(softSkill);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const softSkill = await softSkillController.getById(request.params.id);
    if (!softSkill) {
      response
        .status(404)
        .send("The soft skill with the given ID was not found.");
    } else {
      response.send(softSkill);
    }
  })

  .delete(async (request, response) => {
    const softSkill = await softSkillController.remove(request.params.id);
    if (!softSkill) {
      response
        .status(404)
        .send("The soft skill with the given id was not found.");
    } else {
      response.send(softSkill);
    }
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, softSkillController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["name"];
      const softSkill = await softSkillController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!softSkill) {
        response
          .status(404)
          .send("The soft skill with the given ID was not found.");
      } else {
        response.send(softSkill);
      }
    }
  });

module.exports = router;
