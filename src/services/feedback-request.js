"use strict";

const feedbackRequestCtrl = require("../controllers/feedback-request");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

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
    const { error } = validate(request.body, feedbackRequestCtrl);
    if (error) {
      response.status(400).send("This feedback request cannot be created.");
    } else {
      const feedbackRequest = await feedbackRequestCtrl.create(request.body);
      response.send(feedbackRequest);
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
      response.send(academicExperience);
    }
  });

module.exports = router;
