const { Selection } = require("../models/selection");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

router.get("/", async (req, res) => {
  const selections = await Selection.find().sort("role");
  if (isEmpty(selections)) {
    return res.status(404).send("No selections to show.");
  }

  res.send(selections);
});

router.get("/:id", async (req, res) => {
  const selections = await Selection.find();
  if (isEmpty(selections)) {
    return res.status(404).send("No selections to show.");
  }
  const selection = await Selection.findById(
    mongoose.Types.ObjectId(req.params.id)
  );

  if (!selection)
    return res
      .status(404)
      .send("The selection with the given ID was not found.");

  res.send(selection);
});

router.post("/", async (req, res) => {
  //const { error } = valSelection(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  let selection = new Selection({
    role: req.body.role,
    description: req.body.description,
    phases: req.body.phases,
    current: req.body.current,
  });
  selection = await selection.save();

  res.send(selection);
});

router.put("/:id", async (req, res) => {
  //const { error } = valSelection(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  const selection = await Selection.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    {
      role: req.body.role,
      description: req.body.description,
      phases: req.body.phases,
      current: req.body.current,
    },
    { new: true }
  );

  if (!selection) {
    return res
      .status(404)
      .send("The selection with the given ID was not found.");
  }

  res.send(selection);
});

router.delete("/:id", async (req, res) => {
  const selection = await Selection.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id)
  );

  if (!selection)
    return res
      .status(404)
      .send("The selection with the given ID was not found.");

  res.send(selection);
});

module.exports = router;
