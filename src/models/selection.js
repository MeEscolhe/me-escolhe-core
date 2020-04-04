// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const SelectionSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    phases: {
        type: [String],
        required: true,
        default: []
    }
});

// Exporting to controllers
mongoose.model("Selection", SelectionSchema);
