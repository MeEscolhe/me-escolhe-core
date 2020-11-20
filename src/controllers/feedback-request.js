"use strict";

const { FeedbackRequest } = require("../models/feedback-request");
const mongoose = require("mongoose");

/**
 * Get all feedback requests
 * @returns {array} list of all feedback requests
 */
const getAll = async () => await FeedbackRequest.find();

/**
 * Get feedback request by id
 * @param {string} id
 * @returns {object} feedback request
 */
const getById = async (id) => await FeedbackRequest.findById(id);

/**
 * Create feedback request
 * @param {string} studentId
 * @param {string} phaseId
 * @param {string} teacherId
 * @returns {object} feedback request created
 */
const create = async ({ studentId, phaseId, teacherId }) => {
  const feedbackRequest = new FeedbackRequest({
    studentId: studentId,
    phaseId: phaseId,
    teacherId: teacherId,
  });
  return await feedbackRequest.save();
};

/**
 * Remove feedback request
 * @param {string} feedbackRequestId
 * @throws {InvalidArgumentException} mongoose id invalid or feedback not found
 * @returns {object} feedback request removed
 */
const remove = async (feedbackRequestId) =>
  await FeedbackRequest.findByIdAndRemove(
    mongoose.Types.ObjectId(feedbackRequestId)
  );

module.exports = { getAll, getById, create, remove };
