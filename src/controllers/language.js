const { Language, valLanguage } = require("../models/language");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

router.get("/", async (req, res) => {
  const languages = await Language.find().sort("name");
  if (isEmpty(languages)) {
    return res.status(404).send("No languages to show.");
  }

  res.send(languages);
});

router.get("/:id", async (req, res) => {
  const languages = await Language.find();
  if (isEmpty(languages)) {
    return res.status(404).send("No languages to show.");
  }
  const language = await Language.findById(
    mongoose.Types.ObjectId(req.params.id)
  );

  if (!language)
    return res
      .status(404)
      .send("The language with the given ID was not found.");

  res.send(language);
});

router.post("/", async (req, res) => {
  const { error } = valLanguage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let language = new Language({
    name: req.body.name,
    level: req.body.level,
  });
  language = await language.save();

  res.send(language);
});

router.put("/:id", async (req, res) => {
  const { error } = valLanguage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let varName = req.body.name;
  let varLevel = req.body.level;

  const language = await Language.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    {
      name: req.body.name,
      level: req.body.level,
    },
    { new: true }
  );
  if (!language) {
    return res
      .status(404)
      .send("The language with the given ID was not found.");
  }

  res.send(language);
});

router.delete("/:id", async (req, res) => {
  const language = await Language.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id)
  );

  if (!language)
    return res
      .status(404)
      .send("The language with the given ID was not found.");

  res.send(language);
});

module.exports = router;
