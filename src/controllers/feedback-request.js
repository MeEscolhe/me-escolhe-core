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

const getById = async (id) => {
  const feedbackRequest = await FeedbackRequest.findById(
    mongoose.Types.ObjectId(id)
  );
  return feedbackRequest;
};

const create = async ({ studentId, phaseId }) => {
  let feedbackRequest = new FeedbackRequest({
    studentId: studentId,
    phaseId: phaseId,
  });
  return feedbackRequest.save();
};

const update = async (id, { studentId, phaseId }) => {
  const feedbackRequest = await FeedbackRequest.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      studentId: studentId,
      phaseId: phaseId,
    },
    { new: true }
  );
  return feedbackRequest;
};

const remove = async (id) => {
  const feedbackRequest = await FeedbackRequest.findByIdAndRemove(
    mongoose.Types.ObjectId(id)
  );
  return feedbackRequest;
};

const validate = (object) => {
  const { error } = valFeedbackRequest(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
