"use strict";

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

const CredentialController = require("../controllers/credential");
const TeacherController = require("../controllers/teacher");
const StudentController = require("../controllers/student");
const {
  validatePassword,
  generateToken,
} = require("../middlewares/auth-middleware");
const { Successful, NotAuthorized } = require("../middlewares/rest-middleware");
const router = require("express").Router();

/**
 * Login and get user (teacher or student object)
 * @param {Request} request
 * @param {Response} reponse
 * @returns {object} user (teacher or student object) and token
 */
router.route("/").get(async (request, response) => {
  const credential = await CredentialController.getByEmail(request.body.email);
  if (!credential) return NotAuthorized(response);
  if (!validatePassword(request.body.password, credential.password))
    return NotAuthorized(response);
  const user = {};
  if (credential.isTeacher) {
    user = await TeacherController.getByEmail(request.body.email);
  } else {
    user = await StudentController.getByEmail(request.body.email);
  }
  const token = generateToken(request.body);
  return Successful(response, { user, token });
});

module.exports = router;
