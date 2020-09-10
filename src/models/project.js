// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  selections: {
    type: [String],
    required: true,
    default: [],
  },
});

// Exporting to controllers
mongoose.model("Project", ProjectSchema);
