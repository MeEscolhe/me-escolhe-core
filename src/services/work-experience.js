"use strict";

const workExperienceCtrl = require("../controllers/work-experience");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = workExperienceCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const workExperiences = workExperienceCtrl.getAll();
  if (isEmpty(workExperiences)) {
    return res.status(404).send("No workExperiences to show.");
  }
  res.send(workExperiences);
});

router.get("/:id", async (req, res) => {
  const workExperience = workExperienceCtrl.getById(req.params.id);
  if (!workExperience) {
    return res
      .status(404)
      .send("The workExperience with the given ID was not found.");
  }
  res.send(workExperience);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const workExperience = workExperienceCtrl.create(req.body);
  res.send(workExperience);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const workExperience = workExperienceCtrl.update(req.params.id, req.body);
  res.send(workExperience);
});

router.delete("/:id", async (req, res) => {
  const workExperience = workExperienceCtrl.remove(req.params.id);
  if (!workExperience) {
    return res
      .status(404)
      .send("The workExperience with the given ID was not found.");
  }
  res.send(workExperience);
});

module.exports = router;
