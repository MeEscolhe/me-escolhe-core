"use strict";

const {
  Authorized,
  NotAuthorized,
  UnexpectedError,
} = require("../middlewares/rest-middleware");
const router = require("express").Router();

const CredentialController = require("../controllers/credential");

/**
 * Login and get user (teacher or student object)
 * @param {Request} request
 * @param {Response} reponse
 * @returns {object} user (teacher or student object) and token
 */
router.route("/").post(async (request, response) => {
  try {
    const credential = await CredentialController.authenticate(response.body);
    if (!credential) return NotAuthorized(response);
    return Authorized(response, credential);
  } catch (error) {
    return UnexpectedError(response, error);
  }
});

module.exports = router;
