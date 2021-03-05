const swaggerUi = require("swagger-ui-express");
const {
  addPassword,
  addSelections,
  removeId,
} = require("../../doc/middlewares/model-middleware");

const swaggerSpecs = {
  openapi: "3.0.1",
  info: {
    version: "3.0.0",
    description: `<img src="http://localhost:8080/static/images/Logo-me-escolhe-v7.png)" /> API Documentation`,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      feedbackRequest: require("../../doc/models/feedback-request"),
      lab: require("../../doc/models/lab"),
      phase: require("../../doc/models/phase"),
      project: require("../../doc/models/project"),
      selection: require("../../doc/models/selection"),
      student: require("../../doc/models/student"),
      teacher: require("../../doc/models/teacher"),
    },
    requests: {
      teacherWithPassword: removeId(
        addPassword(require("../../doc/models/teacher-with-password"))
      ),
      studentWithPassword: removeId(
        addPassword(require("../../doc/models/student-with-password"))
      ),
    },
    responses: {
      studentWithSelections: addSelections(
        require("../../doc/models/student-with-password")
      ),
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: "http://localhost:8080/",
    },
  ],
  paths: {
    "/feedbackRequests": require("../../doc/controllers/feedback-request")
      .withoutParameters,
    "/feedbackRequests/{id}": require("../../doc/controllers/feedback-request")
      .withParameters,
    "/login": require("../../doc/controllers/login").withoutParameters,
    "/labs": require("../../doc/controllers/lab").withoutParameters,
    "/labs/{id}": require("../../doc/controllers/lab").withParameters,

    "/phases": require("../../doc/controllers/phase").withoutParameters,
    "/phases/{id}": require("../../doc/controllers/phase").withParameters,
    "/phases/{id}/student/{registration}": require("../../doc/controllers/phase")
      .StudentRoute,

    "/projects": require("../../doc/controllers/project").withoutParameters,
    "/projects/{id}": require("../../doc/controllers/project").withParameters,
    "/projects/teacher/{teacherId}": require("../../doc/controllers/project")
      .teacher,

    "/selections": require("../../doc/controllers/selection").withoutParameters,
    "/selections/{id}": require("../../doc/controllers/selection")
      .withParameters,

    "/students": require("../../doc/controllers/student").withoutParameters,
    "/students/{registration}": require("../../doc/controllers/student")
      .withParameters,
    "/students/inSelection?registration={registration}&selectionId={selectionId}": require("../../doc/controllers/student")
      .seeStudentInSelection,
    "/students/email": require("../../doc/controllers/student").login,

    "/teachers": require("../../doc/controllers/teacher").withoutParameters,
    "/teachers/{id}": require("../../doc/controllers/teacher").withParameters,
    "/teachers/email": require("../../doc/controllers/teacher").login,
    "teachers/{id}/selections": require("../../doc/controllers/teacher")
      .selections,
  },
};
module.exports = {
  swaggerServe: swaggerUi.serve,
  swaggerSetup: swaggerUi.setup(swaggerSpecs, {
    customSiteTitle: "Me Escolhe API",
    customfavIcon: "http://localhost:8080/static/images/Logo.png",
    customCss: require("./Style").styleCss,
  }),
};
