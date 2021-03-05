"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const FEEDBACK_REQUEST = "feedback request";

const FeedbackRequestController = require("../controllers/feedback-request");
const { isEmpty } = require("../middlewares/utils");
const {
  Successful,
  NotFound,
  NotFoundById,
  UnexpectedError,
} = require("../middlewares/rest-middleware");
const router = require("express").Router();

router
  .route("/")
  .get(async (request, response) => {
    try {
      const feedbackRequests = await FeedbackRequestController.getAll();
      if (isEmpty(feedbackRequests))
        return NotFound(response, FEEDBACK_REQUEST);
      return Successful(response, feedbackRequests);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      const feedbackRequest = await FeedbackRequestController.create(
        request.body
      );
      return Successful(response, feedbackRequest);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    try {
      const feedbackRequest = await FeedbackRequestController.getById(
        request.params.id
      );
      if (!feedbackRequest) return NotFoundById(response, FEEDBACK_REQUEST);
      return Successful(response, feedbackRequest);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    try {
      const feedbackRequest = await FeedbackRequestController.remove(
        request.params.id
      );
      if (!feedbackRequest) return NotFoundById(response, FEEDBACK_REQUEST);
      return Successful(response, feedbackRequest);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
