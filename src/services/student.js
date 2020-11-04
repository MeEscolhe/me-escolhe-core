"use strict";
/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * @author Kelvin Cirne
 */
const StudentController = require("../controllers/student");
const express = require("express");
const router = express.Router();
const { isEmpty, validate } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => {
    StudentController.getAll().then((students) => {
      if (isEmpty(students)) {
        response.status(404).send("No students to show.");
      } else {
        response.send(students);
      }
    });
  })
  .post(async (request, response) => {
    const { error, message } = validate(request.body, StudentController);

    if (error) {
      response.status(400).send(message);
    } else {
      const student = StudentController.create(request.body);
      response.send(student);
    }
  });

router.get("/:registration", async (request, response) => {
  StudentController.getByRegistrationWithSelections(
    request.params.registration
  ).then((student) => {
    if (!student) {
      response.status(404).send("The student with the given ID was not found.");
    } else {
      response.send(student);
    }
  });
});
router.put("/:id", (request, response) => {
  const registration = request.params.id;
  const { error, message } = validate(
    { registration, ...request.body },
    StudentController
  );
  if (error) {
    response.status(400).send(message);
  } else {
    StudentController.update(request.params.id, request.body, false).then(
      (student) => {
        if (!student) {
          response
            .status(404)
            .send("The student with the given ID was not found.");
        } else {
          response.send(student);
        }
      }
    );
  }
});

router.delete("/:registration", async (request, response) => {
  StudentController.remove(request.params.registration).then((student) => {
    if (!student) {
      response
        .status(404)
        .send("The student with the given registration was not found.");
    } else {
      response.send(student);
    }
  });
});

module.exports = router;
