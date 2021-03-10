"use strict";
/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 * @author Kelvin Cirne <kelvin.cirne.custodio@ccc.ufcg.edu.br>
 */

const STUDENT = "student";

const StudentController = require("../controllers/student");
const PhaseController = require("../controllers/phase");
const CredentialController = require("../controllers/credential");
const { isEmpty, validate } = require("../middlewares/utils");
const {
  Successful,
  NotFound,
  NotFoundById,
  UnexpectedError,
  NotFoundByEmail
} = require("../middlewares/rest-middleware");
const router = require("express").Router();

router
  .route("/")
  .get(async (request, response) => {
    try{
      let students = await StudentController.getAll();
      if (isEmpty(students)) return NotFound(response, STUDENT);
      return Successful(response, students);
    } catch (error) {
      return UnexpectedError(response, error);
    }
    
  })
  //TODO
  .post(async (request, response) => {
    try {
      const { password, ...student } = request.body;
      const { error, message } = validate(student, StudentController);
      if (error) return UnexpectedError(response, error);
      let createdStudent = await StudentController.create(student);
      await CredentialController.create(request.body, false);
      for (let i = 0; i < createdStudent.phases.length; i++) {
        let phaseId = createdStudent.phases[i];
        await PhaseController.addStudent(phaseId, createdStudent.registration);
      }
      return UnexpectedError(response, createdStudent);
    } catch (error) {
      return UnexpectedError(error);
    }
  });

router.route("/email").get(async (request, response) => {
  try{
    let student = await StudentController.getByEmail(request.body.email);
    if (!student) return NotFoundByEmail(response, STUDENT);
    return Successful(response, student);
  } catch (error) {
    return UnexpectedError(response, error);
  }
  
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
    return Succesful(response, inSelection.length > 0);
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

router
  .route("/:registration")
  .put(async (request, response) => {
    try {
      const registration = request.params.registration;
      const { error, message } = validate(
        { registration, ...request.body },
        StudentController
      );
      const student = await StudentController.update(
        registration,
        request.body,
        true
      );
      if (!student) return NotFoundById(response, STUDENT);
      return Succesful(response, student);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .get(async (request, response) => {
    try {
      let student = await StudentController.getByRegistrationWithSelections(
        request.params.registration
      );
      if (!student) return NotFoundById(response, PROJECT);
      return Successful(response, project);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    try {
      let student = await StudentController.getByRegistration(
        request.params.registration
      );
      if (!student) return NotFoundById(response, STUDENT);
      student = { ...student._doc };
      for (let i = 0; i < student.phases.length; i++) {
        const phaseId = student.phases[i]._id;
        await PhaseController.removeStudent(phaseId, student.registration);
      }
      await StudentController.remove(student.registration);
      return Succesful(response, student);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
