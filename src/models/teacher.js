// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  labId: {
    type: String,
    required: true,
  },
  managements: {
    type: [String],
    required: true,
    default: [],
  },
  feedbackRequests: {
    type: [String],
    required: true,
    default: [],
  },
});

// Exporting to controllers
mongoose.model("Teacher", TeacherSchema);
