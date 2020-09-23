"use strict";

const experienceCtrl = require("../controllers/experience");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

router.get("/", async (req, res) => {
  const experiences = experienceCtrl.getAll();
  if (isEmpty(experiences)) {
    return res.status(404).send("No experiences to show.");
  }
  res.send(experiences);
});

router.get("/:id", async (req, res) => {
  const experience = experienceCtrl.getById(req.params.id);
  if (!experience) {
    return res
      .status(404)
      .send("The experience with the given ID was not found.");
  }
  res.send(experience);
});

router.post("/", async (req, res) => {
  const experience = experienceCtrl.create(req.body);
  res.send(experience);
});

router.put("/:id", async (req, res) => {
  const experience = experienceCtrl.update(req.params.id, req.body);
  if (!experience) {
    return res
      .status(404)
      .send("The experience with the given ID was not found.");
  }
  res.send(experience);
});

router.delete("/:id", async (req, res) => {
  const experience = experienceCtrl.remove(req.params.id);
  if (!experience) {
    return res
      .status(404)
      .send("The experience with the given ID was not found.");
  }
  res.send(experience);
});

module.exports = router;
