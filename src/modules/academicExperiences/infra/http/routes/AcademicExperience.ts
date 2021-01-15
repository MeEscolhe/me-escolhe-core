import { Router } from 'express';

import AcademicExperienceController from '../controllers/AcademicExperienceController';

const AcademicExperienceRouter = Router();
const academicExperienceController = new AcademicExperienceController();

// AcademicExperienceRouter.use(autenticador?);
AcademicExperienceRouter.get('/:id', academicExperienceController.findById);
AcademicExperienceRouter.put('/:id', academicExperienceController.update);
AcademicExperienceRouter.delete('/:id', academicExperienceController.delete);

AcademicExperienceRouter.get('/', academicExperienceController.findAll);
AcademicExperienceRouter.post('/', academicExperienceController.create);

export default AcademicExperienceRouter;
