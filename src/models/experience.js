// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const ExperienceSchema = new mongoose.Schema({
  academic: {
    type: [String],
    required: true,
  },
  work: {
    type: [String],
    required: true,
  },
});

// Exporting to controllers
mongoose.model("Experience", ExperienceSchema);
