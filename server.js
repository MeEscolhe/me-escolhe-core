// Importing dependences
const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");
const mongoConnect = require("./src/config/Mongoose");
// Starting the app, enabling receiving json and using CORS
const app = express();
app.use(express.json());
app.use(cors());

// Starting connection with MongoDB
mongoConnect(true);
