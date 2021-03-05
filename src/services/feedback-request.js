"use strict";

const FeedbackRequestController = require("../controllers/feedback-request");
const { isEmpty } = require("../middlewares/util");
const router = require("express").Router();

router
  .route("/")
  .get(async (request, response) => {
    const feedbackRequests = await FeedbackRequestController.getAll();
    if (isEmpty(feedbackRequests)) {
      return response.status(404).send("No feedback requests to show.");
    } else {
      return response.send(feedbackRequests);
    }
  })

  .post(async (request, response) => {
    try {
      const feedbackRequest = await FeedbackRequestController.create(
        request.body
      );
      return response.send(feedbackRequest);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const feedbackRequest = await FeedbackRequestController.getById(
      request.params.id
    );
    if (!feedbackRequest) {
      response
        .status(404)
        .send("The feedback request with the given ID was not found.");
    } else {
      return response.send(feedbackRequest);
    }
  })

  .delete(async (request, response) => {
    const feedbackRequest = await FeedbackRequestController.remove(
      request.params.id
    );
    if (!feedbackRequest) {
      response
        .status(404)
        .send("The feedback request with the given ID was not found.");
    } else {
      return response.send(feedbackRequest);
    }
  });

module.exports = router;
