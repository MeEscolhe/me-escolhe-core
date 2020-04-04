// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const LabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    teachers: {
        type: [String],
        required: true,
        default: []
    }
});

// Exporting to controllers
mongoose.model("Lab", LabSchema);
