"use strict";

const { FeedbackRequest } = require("../models/feedback-request");
const mongoose = require("mongoose");

/**
 * Get all feedback requests
 * @returns {array} list of all feedback requests
 */
const getAll = async () => {
  const feedbackRequests = await FeedbackRequest.find();
  return feedbackRequests;
};

/**
 * Get feedback request by id
 * @param {string} id
 * @returns {object} feedback request
 */
const getById = async (id) => FeedbackRequest.findById(id);

/**
 * Create feedback request
 * @param {string} studentId
 * @param {string} phaseId
 * @param {string} teacherId
 * @returns {object} feedback request created
 */
const create = ({ studentId, phaseId, teacherId }) => {
  const feedbackRequest = new FeedbackRequest({
    studentId: studentId,
    phaseId: phaseId,
    teacherId: teacherId,
  });

  return feedbackRequest.save().then((feedback) => feedback);
};

/**
 * Remove feedback request
 * @param {string} feedbackRequestId
 * @throws {InvalidArgumentException} mongoose id invalid or feedback not found
 * @returns {string} confirm message
 */
const remove = (feedbackRequestId) =>
  FeedbackRequest.findByIdAndRemove(
    mongoose.Types.ObjectId(feedbackRequestId)
  ).then((feedbackRequestDelete) => {
    if (feedbackRequestDelete) return "Feedback deleted";
    throw "Error delete feedback";
  });

/**
 * Validate feedback request
 * @param {object} object
 * @returns {object} error (when it happens)
 */
const validate = (object) => {
  const { error } = valFeedbackRequest(object);
  return error;
};

module.exports = { getAll, getById, create, remove, validate };
