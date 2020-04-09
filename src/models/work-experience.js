// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const WorkExperienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  instituition: {
    type: String,
    required: true,
  },
  durationInMonths: {
    type: Number,
    min: 0,
  },
});

// Exporting to controllers
mongoose.model("WorkExperience", WorkExperienceSchema);
