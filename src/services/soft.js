"use strict";

const SoftController = require("../controllers/soft");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps  } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => {
    SoftController.getAll().then((softs) => {
      if (isEmpty(softs)) {
        response.status(404).send("No softs to show.");
      } else {
        response.send(softs);
      }
    });
  })
  .post(async (request, response) => {
    const { error, message } = validate(request.body, SoftController);

    if (error) {
      response.status(400).send(message);
    } else {
      const soft = SoftController.create(request.body);
      response.send(soft);
    }
  });

router.get("/:id", async (request, response) => {
  SoftController.getByID(
    request.params.id
  ).then((soft) => {
    if (!soft) {
      response.status(404).send("The soft with the given ID was not found.");
    } else {
      response.send(soft);
    }
  });
});
router.put("/:id", (request, response) => {
  const registration = request.params.id;
  const { error, message } = validate(
    { registration, ...request.body },
    SoftController
  );
  if (error) {
    response.status(400).send(message);
  } else {
    const { name, email, cra, description, skills, experiences } = request.body;

    SoftController.update(
      request.params.id,
      filterProps({ name, email, cra, description, skills, experiences })
    ).then((soft) => {
      if (!soft) {
        response
          .status(404)
          .send("The soft with the given ID was not found.");
      } else {
        response.send(soft);
      }
    });
  }
});

router.delete("/:registration", async (request, response) => {
  SoftController.remove(request.params.registration).then((soft) => {
    if (!soft) {
      response
        .status(404)
        .send("The soft with the given registration was not found.");
    } else {
      response.send(soft);
    }
  });
});

module.exports = router;
