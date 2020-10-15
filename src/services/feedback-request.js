"use strict";

const feedbackRequestCtrl = require("../controllers/feedback-request");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

router.get("/", (req, res) =>
  feedbackRequestCtrl
    .getAll()
    .then((feedbackRequests) => res.send(feedbackRequests))
    .catch((e) => res.status(400).send(e.message))
);

router.get("/:id", (req, res) =>
  feedbackRequestCtrl
    .getById(req.params.id)
    .then((feedbackRequest) => {
      if (!feedbackRequest) {
        res.status(400).send("Feedback request not found");
      } else {
        res.send(feedbackRequest);
      }
    })
    .catch((e) => res.status(400).send(e))
);

router.post("/", (req, res) =>
  feedbackRequestCtrl
    .create(req.body)
    .then((feedback) => res.send(feedback))
    .catch((e) => res.status(400).send(e))
);

router.delete("/:id/", (req, res) =>
  feedbackRequestCtrl
    .remove(req.params.id)
    .then((feedbackRequest) => {
      if (!feedbackRequest) {
        return res
          .status(400)
          .send("The feedbackRequest with the given ID was not found.");
      }
      res.send(feedbackRequest);
    })
    .catch((e) => res.status(400).send(e))
);

module.exports = router;
