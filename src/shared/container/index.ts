import { container } from 'tsyringe';

import IAcademicExperienceRepository from '@modules/academicExperiences/repositories/IAcademicExperienceRepository';
import AcademicExperienceRepository from '@modules/academicExperiences/infra/database/repositories/AcademicExperienceRepository.';

container.registerSingleton<IAcademicExperienceRepository>(
  'AcademicExperienceRepository',
  AcademicExperienceRepository,
);
