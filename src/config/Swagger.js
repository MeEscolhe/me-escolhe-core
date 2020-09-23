const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = {
  openapi: "3.0.1",
  info: {
    title: "Me escolhe API",
    version: "1.0.0",
    description: "Document crud API REST and models",
    license: {
      name: "MIT",
      url: "https://choosealicense.com/licenses/mit/",
    },
    contact: {
      name: "Swagger",
      url: "https://swagger.io",
      email: "Info@SmartBear.com",
    },
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
      "academic-experience": require("../doc/models/academic-experience"),
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
    "/academicExperiences": require("../doc/controllers/academic-experience"),
  },
};
module.exports = {
  swaggerServe: swaggerUi.serve,
  swaggetSetup: swaggerUi.setup(swaggerSpecs),
};
