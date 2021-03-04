const labs = require("./services/lab");
const auth = require("./services/auth");
const workExperiences = require("./services/work-experience");
const academicExperiences = require("./services/academic-experience");
const experiences = require("./services/experience");
const selections = require("./services/selection");
const phases = require("./services/phase");
const projects = require("./services/project");
const feedbackRequests = require("./services/feedback-request");
const students = require("./services/student");
const teachers = require("./services/teacher");

module.exports = {
  labs,
  auth,
  workExperiences,
  academicExperiences,
  experiences,
  selections,
  phases,
  projects,
  feedbackRequests,
  students,
  teachers,
};
