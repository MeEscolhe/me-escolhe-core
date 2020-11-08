"use strict";

const skillCtrl = require("../controllers/skill");
const express = require("express");
const router = express.Router();
const { isEmpty, filterProps, validate } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const skills = await skillCtrl.getAll();
    if (isEmpty(skills)) {
      response.status(404).send("No skills to show.");
    }
    response.send(skills);
  })

  .post(async (request, response) => {
    validate(request.body);
    const skill = await skillCtrl.create(request.body);
    response.send(skill);
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const skill = await skillCtrl.getById(request.params.id);
    if (!skill) {
      response.status(404).send("The skill with the given ID was not found.");
    }
    response.send(skill);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, skillCtrl);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["languages", "soft", "hard"];
      const skill = await skillCtrl.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!skill) {
        response.status(404).send("The skill with the given ID was not found.");
      } else {
        response.send(skill);
      }
    }
  })

  .delete(async (request, response) => {
    const skill = await skillCtrl.remove(request.params.id);
    if (!skill) {
      response.status(404).send("The skill with the given ID was not found.");
    }
    response.send(skill);
  });

module.exports = router;
