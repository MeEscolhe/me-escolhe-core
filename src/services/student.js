"use strict";
/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 * @author Kelvin Cirne
 */
const StudentController = require("../controllers/student");
const PhaseController = require("../controllers/phase");
const CredentialController = require("../controllers/credential");
const { isEmpty, validate } = require("../middlewares/utils");
const router = require("express").Router();

router
  .route("/")
  .get(async (request, response) => {
    let students = await StudentController.getAll();
    if (isEmpty(students)) {
      return response.status(404).send("No students to show.");
    }
    return response.send(students);
  })

  .post(async (request, response) => {
    const { password, ...student } = request.body;
    const { error, message } = validate(student, StudentController);
    if (error) {
      return response.status(400).send(message);
    } else {
      try {
        let createdStudent = await StudentController.create(student);
        await CredentialController.create(request.body, false);
        for (let i = 0; i < createdStudent.phases.length; i++) {
          let phaseId = createdStudent.phases[i];
          await PhaseController.addStudent(
            phaseId,
            createdStudent.registration
          );
        }
        return response.send(createdStudent);
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
  return response.send(student);
});

router.route("/inSelection/").get(async (request, response) => {
  try {
    let { registration, selectionId } = request.query;
    const student = await StudentController.getByRegistrationWithSelections(
      registration
    );
    const inSelection = student.selections.filter(
      (selection) =>
        selection.selection.selectionId.toString() === selectionId.toString()
    );
    response.send(inSelection.length > 0);
  } catch (error) {
    response.status(400).send(error.message);
  }
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
    try {
      let student = await StudentController.getByRegistrationWithSelections(
        request.params.registration
      );
      return response.send(student);
    } catch (error) {
      return response
        .status(404)
        .send("The student with the given ID was not found.");
    }
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
