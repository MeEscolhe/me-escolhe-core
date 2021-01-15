import { Router } from 'express';
import SwaggerRouter from '@documentation/config/Swagger';

import AcademicExperienceRouter from '@modules/academicExperiences/infra/http/routes/AcademicExperience';

const routes = Router();

routes.use('/academicExperiences', AcademicExperienceRouter);
routes.use("/docs", SwaggerRouter);

export default routes;
