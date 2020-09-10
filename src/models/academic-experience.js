// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const AcademicExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
});

// Exporting to controllers
mongoose.model("AcademicExperience", AcademicExperienceSchema);
