// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const GraduationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    instituition: {
        type: String,
        required: true
    }
});

// Exporting to controllers
mongoose.model("Graduation", GraduationSchema);
