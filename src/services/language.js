"use strict";

const languageCtrl = require("../controllers/language");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = languageCtrl.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const languages = languageCtrl.getAll();
  if (isEmpty(languages)) {
    return res.status(404).send("No languages to show.");
  }
  res.send(languages);
});

router.get("/:id", async (req, res) => {
  const language = languageCtrl.getById(req.params.id);
  if (!language) {
    return res
      .status(404)
      .send("The language with the given ID was not found.");
  }
  res.send(language);
});

router.post("/", async (req, res) => {
  validate(req.body);
  const language = languageCtrl.create(req.body);
  res.send(language);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const language = languageCtrl.update(req.params.id, req.body);
  if (!language) {
    return res
      .status(404)
      .send("The language with the given ID was not found.");
  }
  res.send(language);
});

router.delete("/:id", async (req, res) => {
  const language = languageCtrl.remove(req.params.id);
  if (!language) {
    return res
      .status(404)
      .send("The language with the given ID was not found.");
  }
  res.send(language);
});

module.exports = router;
