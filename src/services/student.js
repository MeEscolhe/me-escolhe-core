"use strict";
/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 * @author Kelvin Cirne <kelvin.cirne.custodio@ccc.ufcg.edu.br>
 */

const STUDENT = "student";
const SELECTION = "selection";

const StudentController = require("../controllers/student");
const CredentialController = require("../controllers/credential");
const { isEmpty, validate } = require("../middlewares/utils");
const {
  Found,
  Created,
  Updated,
  Removed,
  NotFound,
  NotFoundById,
  UnexpectedError,
  NotFoundByEmail,
  AlreadyExists,
  Added,
} = require("../middlewares/rest-middleware");
const router = require("express").Router();

router
  .route("/")
  .get(async (request, response) => {
    try {
      let students = await StudentController.getAll();
      if (isEmpty(students)) return NotFound(response, STUDENT);
      return Found(response, students);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .post(async (request, response) => {
    try {
      const { email, password, registration, ...student } = request.body;
      validate({ email, registration, ...student }, StudentController);

      if (await StudentController.getByRegistration(registration))
        return AlreadyExists(response, STUDENT);

      const credential = await CredentialController.create(
        { email, password },
        false
      );
      if (!credential) return NotAuthorized(response);

      await StudentController.create({ email, registration, ...student });
      return Created(response, STUDENT);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router.route("/email").get(async (request, response) => {
  try {
    let student = await StudentController.getByEmail(request.body.email);
    if (!student) return NotFoundByEmail(response, STUDENT);
    return Found(response, student);
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

router
  .route("/:registration")
  .put(async (request, response) => {
    try {
      const registration = request.params.registration;
      const { password, ...body } = request.body;
      validate({ registration, ...body }, StudentController);
      const student = await StudentController.update(
        registration,
        request.body
      );
      if (!student) return NotFoundById(response, STUDENT);
      return Updated(response, student);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .get(async (request, response) => {
    try {
      const student = await StudentController.getByRegistrationWithSelections(
        request.params.registration
      );
      if (!student) NotFound(response, STUDENT);
      return Found(response, student);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })

  .delete(async (request, response) => {
    try {
      const student = await StudentController.remove(
        request.params.registration
      );
      if (!student) return NotFoundById(response, STUDENT);
      return Removed(response, student);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

router
  .route("/:registration/selection/:selectionId")
  .put(async (request, response) => {
    try {
      await StudentController.addSelection(request.params);
      return Added(response, SELECTION);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  })
  .delete(async (request, response) => {
    try {
      await StudentController.removeSelection(request.params);
      return Removed(response, SELECTION);
    } catch (error) {
      return UnexpectedError(response, error);
    }
  });

module.exports = router;
