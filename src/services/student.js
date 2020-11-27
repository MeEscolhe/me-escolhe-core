"use strict";
/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * @author Kelvin Cirne
 */
const StudentController = require("../controllers/student");
const PhaseController = require("../controllers/phase");
const ExperienceController = require("../controllers/experience");
const express = require("express");
const router = express.Router();
const { isEmpty, validate } = require("../middlewares/util");
const experience = require("../models/experience");

router
  .route("/")
  .get(async (request, response) => {
    let students = await StudentController.getAll();
    if (isEmpty(students)) {
      return response.status(404).send("No students to show.");
    }
    for (let i = 0; i < students.length; i++) {
      students[i] = { ...students[i]._doc };
      students[i].experiences = await ExperienceController.getAllByListId(
        students[i].experiences
      );
    }
    return response.send(students);
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, StudentController);
    if (error) {
      return response.status(400).send(message);
    } else {
      try {
        let student = await StudentController.create(request.body);
        for (let i = 0; i < student.phases.length; i++) {
          let phaseId = student.phases[i];
          await PhaseController.addStudent(phaseId, student.registration);
        }
        return response.send(student);
      } catch (error) {
        return response.status(400).send(error.message);
      }
    }
  });

router.route("/email").get(async (request, response) => {
  let student = await StudentController.getByEmail(request.body.email);
  if (!student) {
    return response
      .status(404)
      .send("The student with the given email was not found.");
  }
  student = { ...student._doc };
  student.experiences = await ExperienceController.getAllByListId(
    student.experiences
  );
  return response.send(student);
});

router
  .route("/:registration")
  .put(async (request, response) => {
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
        true
      );
      if (!student) {
        return response
          .status(404)
          .send("The student with the given ID was not found.");
      } else {
        return response.send(student);
      }
    }
  })

  .get(async (request, response) => {
    let student = await StudentController.getByRegistrationWithSelections(
      request.params.registration
    );
    if (!student) {
      return response
        .status(404)
        .send("The student with the given ID was not found.");
    }
    student.experiences = await ExperienceController.getAllByListId(
      student.experiences
    );
    return response.send(student);
  })

  .delete(async (request, response) => {
    let student = await StudentController.getByRegistration(
      request.params.registration
    );
    if (!student) {
      return response
        .status(404)
        .send("The student with the given registration was not found.");
    }
    student = { ...student._doc };
    for (let i = 0; i < student.phases.length; i++) {
      const phaseId = student.phases[i]._id;
      await PhaseController.removeStudent(phaseId, student.registration);
    }
    await StudentController.remove(student.registration);
    return response.send(student);
  });

module.exports = router;
