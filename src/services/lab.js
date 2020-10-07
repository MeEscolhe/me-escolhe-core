"use strict";
/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */
const LabController = require("../controllers/lab");
const ProjectController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const express = require("express");
const router = express.Router();
const { isEmpty } = require("../middlewares/util");

const validate = (body) => {
  const { error } = LabController.validate(body);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const labs = LabController.getAll();
  if (isEmpty(labs)) {
    return res.status(404).send("No labs to show.");
  }
  res.send(labs);
});

router.get("/:id", async (req, res) => {
  const lab = LabController.getById(req.params.id);
  if (!lab) {
    return res.status(404).send("The lab with the given ID was not found.");
  }
  res.send(lab);
});

router.get("/selections/:id", async (request, response) => {
  LabController.getById(request.params.id).then((lab) => {
    if (!lab) {
      return response
        .status(404)
        .send("The lab with the given ID was not found.");
    } else {
      let selections = [];
      lab.managements.forEach((projectId) => {
        ProjectController.getById(projectId).then((project) => {
          project.selections.forEach((selectionId) => {
            SelectionController.getById(selectionId).then((selection) => {
              selections.push(selection);
            });
          });
        });
      });
      response.send(selections);
    }
  });
});

router.post("/", async (req, res) => {
  validate(req.body);
  const lab = LabController.create(req.body);
  res.send(lab);
});

router.put("/:id", async (req, res) => {
  validate(req.body);
  const lab = LabController.update(req.params.id, req.body);
  if (!lab) {
    return res.status(404).send("The lab with the given ID was not found.");
  }
  res.send(lab);
});

router.delete("/:id", async (req, res) => {
  const lab = await LabController.remove(req.params.id);
  if (!lab) {
    return res.status(404).send("The lab with the given ID was not found.");
  }
  res.send(lab);
});

module.exports = router;
