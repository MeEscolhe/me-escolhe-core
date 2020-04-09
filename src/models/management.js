// Importing dependences
const mongoose = require("mongoose");

// Creating schema
const ManagementSchema = new mongoose.Schema({
    teacherId: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true,
    }
});

// Exporting to controllers
mongoose.model("Management", ManagementSchema);
