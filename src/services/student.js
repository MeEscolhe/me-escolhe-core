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
  .get(async (request, response) => {
    const students = await StudentController.getAll();
    if (isEmpty(students)) {
      response.status(404).send("No students to show.");
    } else {
      response.send(students);
    }
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, StudentController);
    if (error) {
      response.status(400).send(message);
    } else {
      const student = await StudentController.create(request.body);
      response.send(student);
    }
  });

router.route("/:id");
router.put(async (request, response) => {
  const registration = request.params.id;
  const { error, message } = validate(
    { registration, ...request.body },
    StudentController
  );
  if (error) {
    response.status(400).send(message);
  } else {
    const student = await StudentController.update(
      request.params.id,
      request.body,
      false
    );
    if (!student) {
      response.status(404).send("The student with the given ID was not found.");
    } else {
      response.send(student);
    }
  }
});

router
  .route("/:registration")
  .get(async (request, response) => {
    const student = await StudentController.getByRegistrationWithSelections(
      request.params.registration
    );
    if (!student) {
      response.status(404).send("The student with the given ID was not found.");
    } else {
      response.send(student);
    }
  })

  .delete(async (request, response) => {
    const student = await StudentController.remove(request.params.registration);
    if (!student) {
      response
        .status(404)
        .send("The student with the given registration was not found.");
    } else {
      response.send(student);
    }
  });

module.exports = router;
