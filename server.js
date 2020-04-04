// Importing dependences
const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

// Starting the App, enabling receiving json and using CORS
const app = express();
app.use(express.json());
app.use(cors());

// Starting connection with MongoDB
mongoose.connect("mongodb://localhost:27017/me-escolhe", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


