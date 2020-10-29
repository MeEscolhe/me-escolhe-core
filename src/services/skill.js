"use strict";

const skillCtrl = require("../controllers/skill");
const express = require("express");
const router = express.Router();
const { isEmpty, filterProps, validate } = require("../middlewares/util");

router.get("/", async (req, res) => {
  const skills = skillCtrl.getAll();
  if (isEmpty(skills)) {
    return res.status(404).send("No skills to show.");
  }
  res.send(skills);
});

router.get("/:id", async (req, res) => {
  const skill = skillCtrl.getById(req.params.id);
  if (!skill) {
    return res.status(404).send("The skill with the given ID was not found.");
  }
  res.send(skill);
});

router.post("/", async (req, res) => {
  validate(req.body);
  let skill = skillCtrl.create(req.body);
  res.send(skill);
});

router.put("/:id", (request, response) => {
  const { error, message } = validate(request.body, skillCtrl);
  if (error) {
    response.status(400).send(message);
  } else {
    const propsToUpdate = ["languages", "soft", "hard"];
    skillCtrl
      .update(request.params.id, filterProps(request.body, propsToUpdate))
      .then((skill) => {
        if (!skill) {
          response
            .status(404)
            .send("The skill with the given ID was not found.");
        } else {
          response.send(skill);
        }
      });
  }
});

router.delete("/:id", async (req, res) => {
  const skill = skillCtrl.remove(req.params.id);
  if (!skill) {
    return res.status(404).send("The skill with the given ID was not found.");
  }
  res.send(skill);
});

module.exports = router;
