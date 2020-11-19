"use strict";

const feedbackRequestCtrl = require("../controllers/feedback-request");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

router
  .route("/")
  .get(async (request, response) => {
    const feedbackRequests = await feedbackRequestCtrl.getAll();
    if (isEmpty(feedbackRequests)) {
      response.status(404).send("No feedback requests to show.");
    } else {
      response.send(feedbackRequests);
    }
  })

  .post(async (request, response) => {
    try {
      const feedbackRequest = await feedbackRequestCtrl.create(request.body);
      response.send(feedbackRequest);
    } catch (error) {
      response.status(400).send(error.message);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const feedbackRequest = await feedbackRequestCtrl.getById(
      request.params.id
    );
    if (!feedbackRequest) {
      response
        .status(404)
        .send("The feedback request with the given ID was not found.");
    } else {
      response.send(feedbackRequest);
    }
  })

  .delete(async (request, response) => {
    const feedbackRequest = await feedbackRequestCtrl.remove(request.params.id);
    if (!feedbackRequest) {
      response
        .status(404)
        .send("The feedback request with the given ID was not found.");
    } else {
      response.send(feedbackRequest);
    }
  });

module.exports = router;
