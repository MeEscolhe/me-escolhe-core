import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import cssStyle from './Style';
const swaggerSpecs = {
  openapi: '3.0.1',
  info: {
    version: '3.0.0',
    description: `<img src='http://localhost:8080/static/images/Logo-me-escolhe-v7.png)' /> API Documentation`,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      'academic-experience': require('../models/academic-experience'),
      experience: require('../models/experience'),
      'feedback-request': require('../models/feedback-request'),
      lab: require('../models/lab'),
      phase: require('../models/phase'),
      project: require('../models/project'),
      selection: require('../models/selection'),
      student: require('../models/student'),
      teacher: require('../models/teacher'),
      'work-experience': require('../models/work-experience'),
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: 'http://localhost:8080/',
    },
  ],
  // customCssUrl:require('./eae.css'),
  paths: {
    '/academicExperiences': require('../endpoints/academic-experience')
      .withoutParameters,
    '/academicExperiences/{id}': require('../endpoints/academic-experience')
      .withParameters,

    '/experiences': require('../endpoints/experience')
      .withoutParameters,
    '/experiences/{id}': require('../endpoints/experience')
      .withParameters,

    '/feedbackRequests': require('../endpoints/feedback-request')
      .withoutParameters,
    '/feedbackRequests/{id}': require('../endpoints/feedback-request')
      .withParameters,

    '/labs': require('../endpoints/lab').withoutParameters,
    '/labs/{id}': require('../endpoints/lab').withParameters,

    '/phases': require('../endpoints/phase').withoutParameters,
    '/phases/{id}': require('../endpoints/phase').withParameters,
    '/phases/{id}/student/{registration}': require('../endpoints/phase')
      .StudentRoute,

    '/projects': require('../endpoints/project').withoutParameters,
    '/projects/{id}': require('../endpoints/project').withParameters,
    '/projects/teacher/{teacherId}': require('../endpoints/project')
      .teacher,

    '/selections': require('../endpoints/selection').withoutParameters,
    '/selections/{id}': require('../endpoints/selection')
      .withParameters,

    '/students': require('../endpoints/student').withoutParameters,
    '/students/{registration}': require('../endpoints/student')
      .withParameters,
    '/students/isInSelection?registration={registration}&selectionId={selectionId}': require('../endpoints/student')
      .seeStudentInSelection,
    '/students/email': require('../endpoints/student').login,

    '/teachers': require('../endpoints/teacher').withoutParameters,
    '/teachers/{id}': require('../endpoints/teacher').withParameters,
    '/teachers/email': require('../endpoints/teacher').login,
    'teachers/{id}/selections': require('../endpoints/teacher')
      .selections,

    '/workExperiences': require('../endpoints/work-experience')
      .withoutParameters,
    '/workExperiences/{id}': require('../endpoints/work-experience')
      .withParameters,
  },
};

const swaggerServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(swaggerSpecs, {
  customSiteTitle: 'Me Escolhe API',
  customfavIcon: 'http://localhost:8080/static/images/Logo.png',
  customCss: cssStyle(),
});
const swaggerRouter = Router();

swaggerRouter.use('/', swaggerServe);
swaggerRouter.get('/', swaggerSetup);

export default swaggerRouter;
