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
      return response.status(404).send("No students to show.");
    } else {
      return response.send(students);
    }
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, StudentController);
    if (error) {
      return response.status(400).send(message);
    } else {
      try {
        const student = await StudentController.create(request.body);
        return response.send(student);
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  });

router.route("/email").get(async (request, response) => {
  const student = await StudentController.getByEmail(request.body.email);
  if (!student) {
    response
      .status(404)
      .send("The student with the given email was not found.");
  } else {
    return response.send(student);
  }
});

router.route("/:registration").put(async (request, response) => {
  const registration = request.params.registration;
  const { error, message } = validate(
    { registration, ...request.body },
    StudentController
  );
  if (error) {
    return response.status(400).send(message);
  } else {
    const student = await StudentController.update(
      registration,
      request.body,
      false
    );
    if (!student) {
      return response
        .status(404)
        .send("The student with the given ID was not found.");
    } else {
      return response.send(student);
    }
  }
});

router
  .route("/:registration")
  .get(async (request, response) => {
    let student = await StudentController.getByRegistrationWithSelections(
      request.params.registration
    );
    if (!student) {
      return response
        .status(404)
        .send("The student with the given ID was not found.");
    } else {
      return response.send(student);
    }
  })

  .delete(async (request, response) => {
    const student = await StudentController.remove(request.params.registration);
    if (!student) {
      response
        .status(404)
        .send("The student with the given registration was not found.");
    } else {
      return response.send(student);
    }
  });

module.exports = router;
