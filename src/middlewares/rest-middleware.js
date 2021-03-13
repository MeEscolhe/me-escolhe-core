("use strict");

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */

/**
 * Check if an object is string
 * @param {string} object
 * @returns {string} message
 */
const isString = (object) => typeof object === "string";

/**
 * Return successfuly response
 * @param {string} object
 * @returns {string} message
 */
const Successful = (response, body, action) =>
  isString(body)
    ? response.send({ message: `${body} was ${action}.` })
    : response.send(body);

/**
 * Successful POST request
 * @param {Response} response
 * @param {object | array} object
 * @returns {Response} response
 */
const Created = (response, body) => Successful(response, body, "created");

/**
 * Successful PUT request
 * @param {Response} response
 * @param {object | array} object
 * @returns {Response} response
 */
const Updated = (response, body) => Successful(response, body, "updated");

/**
 * Successful REMOVE request
 * @param {Response} response
 * @param {object | array} object
 * @returns {Response} response
 */
const Removed = (response, body) => Successful(response, body, "removed");

/**
 * Successful auth (GET) request
 * @param {Response} response
 * @param {object | array} object
 * @returns {Response} response
 */
const Authorized = (response, body) => Successful(response, body);

/**
 * Successful auth request
 * @param {Response} response
 * @param {object | array} object
 * @returns {Response} response
 */
const Found = (response, body) => Successful(response, body);

/**
 * Not found resource
 * @param {Response} response
 * @param {string} object
 * @returns {Response} response with status 404
 */
const NotFound = (response, objects = "object") =>
  response.status(404).json(`No ${objects}s to show.`);

/**
 * Message for "Not found by identifier" errors
 * @param {string} object
 * @param {string} identifier
 * @returns {string} message
 */
const NotFoundByIdentifierMessage = (object = "object", identifier = "ID") =>
  `The ${object} with the given ${identifier} was not found.`;

/**
 * Not found resource by ID
 * @param {Response} response
 * @param {string} object
 * @returns {Response} response with status 404
 */
const NotFoundById = (response, object = "object") =>
  response.status(404).json(NotFoundByIdentifierMessage(object));

/**
 * Not found resource by email
 * @param {Response} response
 * @param {string} object
 * @returns {Response} response with status 404
 */
const NotFoundByEmail = (response, object = "object") =>
  response.status(404).json(NotFoundByIdentifierMessage(object, "email"));

/**
 * Not found resource by registration
 * @param {Response} response
 * @param {string} object
 * @returns {Response} response with status 404
 */
const NotFoundByRegistration = (response, object = "object") =>
  response
    .status(404)
    .json(NotFoundByIdentifierMessage(object, "registration"));

/**
 * Operation not authorized
 * @param {Response} response
 * @returns {Response} response with status 403
 */
const NotAuthorized = (response) =>
  response.status(403).json({ message: "Email or password incorrect" });

/**
 * An unexpected error occurred
 * @param {Response} response
 * @param {Error} error
 * @returns {Response} response with status 400
 */
const UnexpectedError = (response, error) =>
  response.status(400).json(`An unexpected error occurred: ${error.message}.`);

module.exports = {
  Found,
  Created,
  Updated,
  Removed,
  Authorized,
  NotFound,
  NotFoundById,
  NotFoundByEmail,
  NotFoundByRegistration,
  NotAuthorized,
  UnexpectedError,
};
