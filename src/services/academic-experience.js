"use strict";

const academicExperienceCtrl = require("../controllers/academic-experience");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = academicExperienceCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const academicExperiences = academicExperienceCtrl.getAll();
  if (isEmpty(academicExperiences)) {
    return res.status(404).send("No academicExperiences to show.");
  }
  res.send(academicExperiences);
});

router.get("/:id", async (req, res) => {
  const academicExperience = academicExperienceCtrl.getById(req.params.id);
  if (!academicExperience) {
    return res
      .status(404)
      .send("The academicExperiences with the given ID was not found.");
  }
  res.send(academicExperience);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const academicExperience = academicExperienceCtrl.create(req.body);
  res.send(academicExperience);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const academicExperience = academicExperienceCtrl.update(
    req.params.id,
    req.body
  );
  if (!academicExperience) {
    return res
      .status(404)
      .send("The academicExperiences with the given ID was not found.");
  }
  res.send(academicExperience);
});

router.delete("/:id", async (req, res) => {
  const academicExperience = academicExperienceCtrl.remove(req.params.id);
  if (!academicExperience) {
    return res
      .status(404)
      .send("The academicExperiences with the given ID was not found.");
  }
  res.send(academicExperience);
});

module.exports = router;
