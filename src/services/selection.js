"use strict";

const SelectionController = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router.get("/", async (request, response) => {
  const { page = 1, limit = 10 } = request.body;
  const selections = await SelectionController.getAll({ page, limit });
  if (isEmpty(selections)) {
    return response.status(404).send("No selections to show.");
  }
  response.send(selections);
});

router.get("/:id", async (request, response) => {
  const selection = await SelectionController.getById(request.params.id);

  if (!selection) {
    return response
      .status(404)
      .send("The selection with the given ID was not found.");
  }
  response.send(selection);
});

router.post("/", async (request, response) => {
  const { error, message } = validate(request.body, SelectionController);
  if (error) {
    response.status(400).send(message);
  } else {
    const selection = await SelectionController.create(request.body);
    response.send(selection);
  }
});

router.put("/:id", (request, response) => {
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
    SelectionController.update(
      request.params.id,
      filterProps(request.body, propsToUpdate)
    ).then((selection) => {
      if (!selection) {
        response
          .status(404)
          .send("The selection with the given ID was not found.");
      } else {
        response.send(selection);
      }
    });
  }
});
router.delete("/:id", async (request, response) => {
  SelectionController.remove(request.params.id).then((selection) => {
    if (!selection) {
      return response
        .status(404)
        .send("The selection with the given ID was not found.");
    } else {
      response.send(selection);
    }
  });
});

module.exports = router;
