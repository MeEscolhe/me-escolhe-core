"use strict";

const hardCtrl = require("../controllers/hard");
const express = require("express");
const router = express.Router();
const { validate, isEmpty, filterProps } = require("../middlewares/util");

router.get("/", async (request, response) => {
  const hards = hardCtrl.getAll();
  if (isEmpty(hards)) {
    return response.status(404).send("No hard skills to show.");
  }
  response.send(hards);
});

router.get("/:id", async (request, response) => {
  const hard = hardCtrl.getById(request.params.id);
  if (!hard) {
    return response
      .status(404)
      .send("The hard with the given ID was not found.");
  }
  response.send(hard);
});

router.post("/", async (request, response) => {
  const { error } = validate(request.body, hardCtrl);
  if (error) {
    response.status(400).send("This hard skill cannot be created.");
  } else {
    const hard = await hardCtrl.create(request.body);
    response.send(hard);
  }
});

router.put("/:id", async (request, response) => {
  const { error, message } = validate(request.body, hardCtrl);
  if (error) {
    response.status(400).send(message);
  } else {
    const propsToUpdate = ["name", "level"];
    hardCtrl
      .update(request.params.id, filterProps(request.body, propsToUpdate))
      .then((hard) => {
        if (!hard) {
          response
            .status(404)
            .send("The hard with the given ID was not found.");
        } else {
          response.send(hard);
        }
      });
  }
});

router.delete("/:id", async (request, response) => {
  const hard = hardCtrl.remove(request.params.id);
  if (!hard) {
    return response
      .status(404)
      .send("The hard skills with the given ID was not found.");
  }
  response.send(hard);
});

module.exports = router;
