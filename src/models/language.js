// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const LanguageSchema = new mongoose.Schema({
    name: {
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
mongoose.model("Language", LanguageSchema);
