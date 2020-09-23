const { Skill } = require("../models/skill");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

router.get("/", async (req, res) => {
  const skills = await Skill.find().sort("name");
  if (isEmpty(skills)) {
    return res.status(404).send("No skills to show.");
  }

  res.send(skills);
});

router.get("/:id", async (req, res) => {
  const skills = await Skill.find();
  if (isEmpty(skills)) {
    return res.status(404).send("No skills to show.");
  }
  const skill = await Skill.findById(mongoose.Types.ObjectId(req.params.id));

  if (!skill)
    return res.status(404).send("The skill with the given ID was not found.");

  res.send(skill);
});

router.post("/", async (req, res) => {
  // const { error } = valSkill(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let skill = new Skill({
    languages: req.body.languages,
    soft: req.body.soft,
    hard: req.body.hard,
  });
  skill = await skill.save();

  res.send(skill);
});

router.put("/:id", async (req, res) => {
  //const { error } = valSkill(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  const skill = await Skill.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    {
      languages: req.body.languages,
      soft: req.body.soft,
      hard: req.body.hard,
    },
    { new: true }
  );
  if (!skill) {
    return res.status(404).send("The skill with the given ID was not found.");
  }
  res.send(skill);
});

router.delete("/:id", async (req, res) => {
  const skill = await Skill.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id)
  );

  if (!skill)
    return res.status(404).send("The skill with the given ID was not found.");

  res.send(skill);
});

module.exports = router;
