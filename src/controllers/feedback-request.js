"use strict";

const {
  FeedbackRequest,
  valFeedbackRequest,
} = require("../models/feedback-request");
const mongoose = require("mongoose");
const { updateObject } = require("../middlewares/util");
const getAll = async () => {
  const feedbackRequests = await FeedbackRequest.find();
  return feedbackRequests;
};
const getById = async (id) => FeedbackRequest.findById(id);

const create = ({ studentId, phaseId, teacherId }) => {
  const feedbackRequest = new FeedbackRequest({
    studentId: studentId,
    phaseId: phaseId,
    teacherId: teacherId,
  });

  return feedbackRequest.save().then((feedback) => feedback);
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
const remove = (feedbackRequestId, teacherId) =>
  FeedbackRequest.findByIdAndRemove(feedbackRequestId).then(
    (feedbackRequestDelete) => {
      if (feedbackRequestDelete) return "Feedback deleted";
      throw "Error delete feedback";
    }
  );
const validate = (object) => {
  const { error } = valFeedbackRequest(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
