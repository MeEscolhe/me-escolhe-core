// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const WorkExperienceSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    instituition: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        min: 0,
        max: 2,
        required: true,
    }
});

// Exporting to controllers
mongoose.model("WorkExperience", WorkExperienceSchema);
