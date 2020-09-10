// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const PhaseSchema = new mongoose.Schema({
  students: {
    type: [String],
    required: true,
    default: [],
  },
  selectionId: {
    type: String,
    required: true,
  },
});

// Exporting to controllers
mongoose.model("Phase", PhaseSchema);
