const mongoose = require("mongoose");
const express = require("express");
const app = express();
var path = require("path");

require("./config/Mongoose")(false);
const { swaggerServe, swaggetSetup } = require("./config/swagger/Swagger");
app.use(express.static("public"));
app.use("/static", express.static("public"));

const {
  labs,
  workExperiences,
  academicExperiences,
  experiences,
  languages,
  softSkills,
  hardSkills,
  skills,
  selections,
  phases,
  projects,
  feedbackRequests,
  students,
  teachers,
} = require("./Router");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

app.use(express.json());
app.use("/labs", labs);
app.use("/workExperiences", workExperiences);
app.use("/academicExperiences", academicExperiences);
app.use("/experiences", experiences);
app.use("/languages", languages);
app.use("/softSkills", softSkills);
app.use("/hardSkills", hardSkills);
app.use("/skills", skills);
app.use("/selections", selections);
app.use("/phases", phases);
app.use("/projects", projects);
app.use("/feedbackRequests", feedbackRequests);
app.use("/students", students);
app.use("/teachers", teachers);
app.use("/docs", swaggerServe, swaggetSetup);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
