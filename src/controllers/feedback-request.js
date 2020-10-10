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
const { Teacher } = require("../models/teacher");
const getById = async (id) => FeedbackRequest.findById(id);

const create = ({ studentId, phaseId, teacherId }) =>
  Teacher.findById(mongoose.Types.ObjectId(teacherId)).then((teacher) => {
    if (!teacher) throw "Teacher not found";

    let feedbackRequest = new FeedbackRequest({
      studentId: studentId,
      phaseId: phaseId,
    });

    return feedbackRequest.save().then((feedback) => {
      teacher.feedbackRequests.push(feedback._id);
      return updateObject(Teacher, teacherId, {
        feedbackRequests: teacher.feedbackRequests,
      }).then((teacherUpdated) => {
        if (teacherUpdated) return "Feedback top";
        FeedbackRequest.findByIdAndRemove(
          mongoose.Types.ObjectId(feedback._id)
        ).then(() => {
          throw "Erro ao salvar o prof";
        });
      });
    });
  });

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
  Promise.all([
    Teacher.findById(mongoose.Types.ObjectId(teacherId)),
    FeedbackRequest.findById(mongoose.Types.ObjectId(feedbackRequestId)),
  ]).then(([teacher, feedbackRequest]) => {
    verifyFeedBackAndTeacher(feedbackRequest, teacher);
    teacher.feedbackRequests = teacher.feedbackRequests.filter(
      (feedbackRequestFK) => !feedbackRequestFK.equals(feedbackRequestId)
    );
    return updateObject(Teacher, teacherId, {
      feedbackRequests: teacher.feedbackRequests,
    }).then((teacherUpdated) => {
      if (teacherUpdated) {
        return FeedbackRequest.findByIdAndRemove(
          mongoose.Types.ObjectId(feedbackRequestId)
        ).then((feedbackRequestDelete) => {
          if (feedbackRequestDelete) return "Feedback deleted";
          throw "Error to delete feedback";
        });
      }

      throw "Error to update teacher when delete feedback";
    });
  });

/**
 *
 * @param {object} feedbackRequest
 * @param {object} teacher
 */
const verifyFeedBackAndTeacher = (feedbackRequest, teacher) => {
  if (!feedbackRequest && !teacher) {
    throw "Teacher and feedback not found";
  } else if (!teacher) {
    throw "Teacher not found";
  } else if (!feedbackRequest) {
    throw "Feedback not found";
  }
};
const validate = (object) => {
  const { error } = valFeedbackRequest(object);
  return error;
};

module.exports = { getAll, getById, create, update, remove, validate };
