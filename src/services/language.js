"use strict";

const languageCtrl = require("../controllers/language");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const languages = await languageCtrl.getAll();
    if (isEmpty(languages)) {
      response.status(404).send("No languages to show.");
    }
    response.send(languages);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, languageCtrl);
    if (error) {
      response.status(400).send(message);
    } else {
      const language = await languageCtrl.create(request.body);
      response.send(language);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const language = await languageCtrl.getById(request.params.id);
    if (!language) {
      response
        .status(404)
        .send("The language with the given ID was not found.");
    }
    response.send(language);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, languageCtrl);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = ["name", "level"];
      const language = await languageCtrl.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!language) {
        response
          .status(404)
          .send("The language with the given ID was not found.");
      } else {
        response.send(language);
      }
    }
  })

  .delete(async (request, response) => {
    const language = languageCtrl.remove(request.params.id);
    if (!language) {
      response
        .status(404)
        .send("The language with the given ID was not found.");
    }
    response.send(language);
  });

module.exports = router;
