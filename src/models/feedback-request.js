const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { FKHelper } = require('../middlewares/util');

const FeedbackRequestSchema = mongoose.model(
  "FeedbackRequest",
  new mongoose.Schema({
    studentId: {
      type: Number,
      ref: "StudentSchema",
      required: true,
      validate: {
        isAsync: true,
        validator: function (v) {
          return FKHelper(mongoose.model('StudentSchema'), v);
        },
        message: `studentId doesn't exist`
      }
    },
    phaseId: {
      type: ObjectId,
      ref: "PhaseSchema",
      required: true,
      validate: {
        isAsync: true,
        validator: function (v) {
          return FKHelper(mongoose.model('PhaseSchema'), v);
        },
        message: `PhaseSchema doesn't exist`
      }
    },
  })
);
exports.FeedbackRequest = FeedbackRequestSchema;
