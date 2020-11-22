const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
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
      "academic-experience": require("../../doc/models/academic-experience"),
      experience: require("../../doc/models/experience"),
      "feedback-request": require("../../doc/models/feedback-request"),
      lab: require("../../doc/models/lab"),
      phase: require("../../doc/models/phase"),
      project: require("../../doc/models/project"),
      selection: require("../../doc/models/selection"),
      student: require("../../doc/models/student"),
      teacher: require("../../doc/models/teacher"),
      "work-experience": require("../../doc/models/work-experience"),
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
  // customCssUrl:require('./eae.css'),
  paths: {
    "/academicExperiences": require("../../doc/controllers/academic-experience")
      .withoutParameters,
    "/academicExperiences/{id}": require("../../doc/controllers/academic-experience")
      .withParameters,

    "/experiences": require("../../doc/controllers/experience")
      .withoutParameters,
    "/experiences/{id}": require("../../doc/controllers/experience")
      .withParameters,

    "/feedbackRequests": require("../../doc/controllers/feedback-request")
      .withoutParameters,
    "/feedbackRequests/{id}": require("../../doc/controllers/feedback-request")
      .withParameters,

    "/labs": require("../../doc/controllers/lab").withoutParameters,
    "/labs/{id}": require("../../doc/controllers/lab").withParameters,

    "/phases": require("../../doc/controllers/phase").withoutParameters,
    "/phases/{id}": require("../../doc/controllers/phase").withParameters,
    "/phases/{id}/students/{studentId}": require("../../doc/controllers/phase")
      .students,

    "/projects": require("../../doc/controllers/project").withoutParameters,
    "/projects/{id}": require("../../doc/controllers/project").withParameters,

    "/selections": require("../../doc/controllers/selection").withoutParameters,
    "/selections/{id}": require("../../doc/controllers/selection")
      .withParameters,

    "/students": require("../../doc/controllers/student").withoutParameters,
    "/students/{registration}": require("../../doc/controllers/student")
      .withParameters,
    "/students/email": require("../../doc/controllers/student").login,

    "/teachers": require("../../doc/controllers/teacher").withoutParameters,
    "/teachers/{id}": require("../../doc/controllers/teacher").withParameters,
    "/teachers/email": require("../../doc/controllers/teacher").login,
    "teachers/{id}/selections": require("../../doc/controllers/teacher")
      .selections,

    "/workExperiences": require("../../doc/controllers/work-experience")
      .withoutParameters,
    "/workExperiences/{id}": require("../../doc/controllers/work-experience")
      .withParameters,
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
