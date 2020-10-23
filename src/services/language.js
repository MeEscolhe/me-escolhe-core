"use strict";

const languageCtrl = require("../controllers/language");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router.get("/", async (request, response) => {
  const languages = await languageCtrl.getAll();
  if (isEmpty(languages)) {
    return response.status(404).send("No languages to show.");
  }
  response.send(languages);
});

router.get("/:id", async (request, response) => {
  const language = languageCtrl.getById(request.params.id);
  if (!language) {
    return response
      .status(404)
      .send("The language with the given ID was not found.");
  }
  response.send(language);
});

router.post("/", async (request, response) => {
  const { error, message } = validate(request.body, languageCtrl);
  if (error) {
    response.status(400).send(message);
  } else {
    const language = await languageCtrl.create(request.body);
    response.send(language);
  }
});

router.put("/:id", async (request, response) => {
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
      return response
        .status(404)
        .send("The language with the given ID was not found.");
    } else {
      response.send(language);
    }
  }
});

router.delete("/:id", async (request, response) => {
  const language = languageCtrl.remove(request.params.id);
  if (!language) {
    return response
      .status(404)
      .send("The language with the given ID was not found.");
  }
  response.send(language);
});

module.exports = router;
