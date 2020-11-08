"use strict";

const SelectionController = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const { page = 1, limit = 10 } = request.body;
    const selections = await SelectionController.getAll({ page, limit });
    if (isEmpty(selections)) {
      response.status(404).send("No selections to show.");
    }
    response.send(selections);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, SelectionController);
    if (error) {
      response.status(400).send(message);
    } else {
      const selection = await SelectionController.create(request.body);
      response.send(selection);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const selection = await SelectionController.getById(request.params.id);
    if (!selection) {
      response
        .status(404)
        .send("The selection with the given ID was not found.");
    }
    response.send(selection);
  })

  .put(async (request, response) => {
    const { error, message } = validate(request.body, SelectionController);
    if (error) {
      response.status(400).send(message);
    } else {
      const propsToUpdate = [
        "role",
        "description",
        "phases",
        "current",
        "skills",
      ];
      const selection = await SelectionController.update(
        request.params.id,
        filterProps(request.body, propsToUpdate)
      );
      if (!selection) {
        response
          .status(404)
          .send("The selection with the given ID was not found.");
      } else {
        response.send(selection);
      }
    }
  })

  .delete(async (request, response) => {
    const selection = await SelectionController.remove(request.params.id);
    if (!selection) {
      response
        .status(404)
        .send("The selection with the given ID was not found.");
    } else {
      response.send(selection);
    }
  });

module.exports = router;
