"use strict";

const feedbackRequestCtrl = require("../controllers/feedback-request");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = feedbackRequestCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const feedbackRequests = feedbackRequestCtrl.getAll();
  if (isEmpty(feedbackRequests)) {
    return res.status(404).send("No feedbackRequests to show.");
  }
  res.send(feedbackRequests);
});

router.get("/:id", async (req, res) => {
  const feedbackRequest = feedbackRequestCtrl.getById(req.params.id);
  if (!feedbackRequest) {
    return res
      .status(404)
      .send("The feedbackRequest with the given ID was not found.");
  }
  res.send(feedbackRequest);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const feedbackRequest = feedbackRequestCtrl.create(req.body)
    .then((feedback) => res.send(feedback)).catch((e) =>
      res.status(400).send(e));
};

router.put("/:id", async (req, res) => {
  validate(req.body);
  const feedbackRequest = feedbackRequestCtrl.update(req.params.id, req.body);
  if (!feedbackRequest) {
    return res
      .status(404)
      .send("The feedbackRequest with the given ID was not found.");
  }
  res.send(feedbackRequest);
});

router.delete("/:id", async (req, res) => {
  const feedbackRequest = feedbackRequestCtrl.remove(req.params.id);
  if (!feedbackRequest) {
    return res
      .status(404)
      .send("The feedbackRequest with the given ID was not found.");
  }
  res.send(feedbackRequest);
});

module.exports = router;
