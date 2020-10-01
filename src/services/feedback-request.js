"use strict";

const feedbackRequestCtrl = require("../controllers/feedback-request");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

router.get("/", async (req, res) =>
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
    .catch((e) => res.status(400).send(e.message))
);

router.post("/", async (req, res) =>
  feedbackRequestCtrl
    .create(req.body)
    .then((feedback) => res.send(feedback))
    .catch((e) => res.status(400).send(e.message))
);

router.put("/:id", async (req, res) =>
  feedbackRequestCtrl
    .update(req.params.id, req.body)
    .then((feedback) => res.send(feedback))
    .catch((e) => res.status(400).send(e.message))
);

router.delete("/:id", async (req, res) =>
  feedbackRequestCtrl
    .remove(req.params.id)
    .then((feedbackRequest) => {
      if (!feedbackRequest) {
        return res
          .status(404)
          .send("The feedbackRequest with the given ID was not found.");
      }
      res.send(feedbackRequest);
    })
    .catch((e) => res.status(400).send(e.message))
);

module.exports = router;
