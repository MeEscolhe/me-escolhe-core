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
      "hard-skill": require("../../doc/models/hard"),
      lab: require("../../doc/models/lab"),
      language: require("../../doc/models/language"),
      phase: require("../../doc/models/phase"),
      project: require("../../doc/models/project"),
      selection: require("../../doc/models/selection"),
      skill: require("../../doc/models/skill"),
      "soft-skill": require("../../doc/models/soft"),
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

    "/hardSkills": require("../../doc/controllers/hard").withoutParameters,
    "/hardSkills/{id}": require("../../doc/controllers/hard").withParameters,

    "/labs": require("../../doc/controllers/lab").withoutParameters,
    "/labs/{id}": require("../../doc/controllers/lab").withParameters,

    "/languages": require("../../doc/controllers/language").withoutParameters,
    "/languages/{id}": require("../../doc/controllers/language").withParameters,

    "/phases": require("../../doc/controllers/phase").withoutParameters,
    "/phases/{id}": require("../../doc/controllers/phase").withParameters,

    "/projects": require("../../doc/controllers/project").withoutParameters,
    "/projects/{id}": require("../../doc/controllers/project").withParameters,

    "/selections": require("../../doc/controllers/selection").withoutParameters,
    "/selections/{id}": require("../../doc/controllers/selection")
      .withParameters,

    "/skills": require("../../doc/controllers/skill").withoutParameters,
    "/skills/{id}": require("../../doc/controllers/skill").withParameters,

    "/softSkills": require("../../doc/controllers/soft").withoutParameters,
    "/softSkills/{id}": require("../../doc/controllers/soft").withParameters,

    "/students": require("../../doc/controllers/student").withoutParameters,
    "/students/{id}": require("../../doc/controllers/student").withParameters,

    "/teachers": require("../../doc/controllers/teacher").withoutParameters,
    "/teachers/{id}": require("../../doc/controllers/teacher").withParameters,

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
