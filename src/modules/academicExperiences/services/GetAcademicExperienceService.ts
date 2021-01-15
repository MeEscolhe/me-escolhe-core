import { injectable, inject } from 'tsyringe';

import IAcademicExperienceRepository from '../repositories/IAcademicExperienceRepository';
import AcademicExperience from '../infra/database/entities/AcademicExperience';
import AppError from '@shared/errors/AppError';

@injectable()
class GetAcademicExperienceService {
  constructor(
    @inject('AcademicExperienceRepository')
    private academicExperienceRepository: IAcademicExperienceRepository,
  ) { }

  public async execute(id: string): Promise<AcademicExperience | undefined> {

    const academicExperience = await this.academicExperienceRepository.findById(id);

    if (academicExperience)
      return academicExperience;
    throw new AppError("The academic experience with the given id was not found.")
  }

}

export default GetAcademicExperienceService;
