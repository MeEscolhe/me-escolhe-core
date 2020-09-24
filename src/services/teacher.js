"use strict";

const teacherCtrl = require("../controllers/teacher");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

router.get("/", async (req, res) => {
  const teachers = teacherCtrl.getAll();
  if (isEmpty(teachers)) {
    return res.status(404).send("No teachers to show.");
  }
  res.send(teachers);
});

router.get("/:id", async (req, res) => {
  const teacher = teacherCtrl.getById(req.params.id);
  if (!teacher) {
    return res.status(404).send("The teacher with the given ID was not found.");
  }
  res.send(teacher);
});

router.post("/", async (req, res) => {
  const teacher = teacherCtrl.create(req.body);
  res.send(teacher);
});

router.put("/:id", async (req, res) => {
  const teacher = teacherCtrl.update(req.params.id, req.body);
  if (!teacher) {
    return res.status(404).send("The teacher with the given ID was not found.");
  }
  res.send(teacher);
});

router.delete("/:id", async (req, res) => {
  const teacher = teacherCtrl.remove(req.params.id);
  if (!teacher) {
    return res.status(404).send("The teacher with the given ID was not found.");
  }
  res.send(teacher);
});

module.exports = router;
