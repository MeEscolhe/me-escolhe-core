"use strict";

const studentCtrl = require("../controllers/student");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = studentCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const students = studentCtrl.getAll();
  if (isEmpty(students)) {
    return res.status(404).send("No students to show.");
  }
  res.send(students);
});

router.get("/:registration", async (req, res) => {
  const student = studentCtrl.getById(req.params.registration);
  if (!student) {
    return res.status(404).send("The student with the given ID was not found.");
  }
  res.send(student);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const student = studentCtrl.create(req.body);
  res.send(student);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const student = studentCtrl.update(req.params.registration, req.body);
  if (!student) {
    return res.status(404).send("The student with the given ID was not found.");
  }
  res.send(student);
});

router.delete("/:registration", async (req, res) => {
  const student = studentCtrl.remove(req.params.registration);
  if (!student) {
    return res
      .status(404)
      .send("The student with the given registration was not found.");
  }
  res.send(student);
});

module.exports = router;
