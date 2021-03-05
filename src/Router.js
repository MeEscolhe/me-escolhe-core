const labs = require("./services/lab");
const auth = require("./services/auth");
const selections = require("./services/selection");
const phases = require("./services/phase");
const projects = require("./services/project");
const feedbackRequests = require("./services/feedback-request");
const students = require("./services/student");
const teachers = require("./services/teacher");

module.exports = {
  labs,
  auth,
  selections,
  phases,
  projects,
  feedbackRequests,
  students,
  teachers,
};
