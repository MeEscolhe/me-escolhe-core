"use strict";

const {
  FeedbackRequest,
  valFeedbackRequest,
} = require("../models/feedback-request");
const mongoose = require("mongoose");

const getAll = async () => {
  const feedbackRequests = await FeedbackRequest.find();
  return feedbackRequests;
};

const getById = async (id) => FeedbackRequest.findById(id);

const create = async ({ studentId, phaseId }) => {
  let feedbackRequest = new FeedbackRequest({
    studentId: studentId,
    phaseId: phaseId,
  });
  return feedbackRequest.save();
};

const update = (id, { studentId, phaseId }) =>
  FeedbackRequest.findByIdAndUpdate(
    id,
    {
      studentId: studentId,
      phaseId: phaseId,
    },
    { new: true }
  );

const remove = async (id) => FeedbackRequest.findByIdAndRemove(id);

const validate = (object) => {
  const { error } = valFeedbackRequest(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
