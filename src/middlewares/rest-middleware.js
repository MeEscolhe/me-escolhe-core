const { response } = require("express");

("use strict");

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

/**
 * Successful request
 * @param {Response} response
 * @param {object | array} body
 * @returns {Response} response with status 200
 */
const Successful = (response, body) => response.send(body);

/**
 * Not found resource
 * @param {Response} response
 * @param {string} context
 * @returns {Response} response with status 404
 */
const NotFound = (response, objects = "object") =>
  response.status(404).send(`No ${objects}s to show.`);

/**
 * Not found resource by ID
 * @param {Response} response
 * @param {string} context
 * @returns {Response} response with status 404
 */
const NotFoundById = (response, object = "object") =>
  response.status(404).send(`The ${object} with the given ID was not found.`);

/**
 * Operation not authorized
 * @param {Response} response
 * @returns {Response} response with status 403
 */
const NotAuthorized = (response) =>
  response.status(403).send("Email or password incorrect");

/**
 * An unexpected error occurred
 * @param {Response} response
 * @param {Error} error
 * @returns {Response} response with status 400
 */
const UnexpectedError = (response, error) =>
  response.status(400).send(`An unexpected error occurred: ${error.message}.`);

module.exports = {
  Successful,
  NotFound,
  NotFoundById,
  NotAuthorized,
  UnexpectedError,
};
