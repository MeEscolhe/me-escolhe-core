// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const FeedbackRequestSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  phaseId: {
    type: String,
    required: true,
  },
});

// Exporting to controllers
mongoose.model("FeedbackRequest", FeedbackRequestSchema);
