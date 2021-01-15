import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError'
import IAcademicExperienceRepository from '../repositories/IAcademicExperienceRepository';
import AcademicExperience from '../infra/database/entities/AcademicExperience';

@injectable()
class UpdateAcademicExperienceService {
  constructor(
    @inject('AcademicExperienceRepository')
    private academicExperienceRepository: IAcademicExperienceRepository,
  ) { }

  public async execute(id: string, data: AcademicExperience): Promise<AcademicExperience> {
    const academicExperience = await this.academicExperienceRepository.findById(id);
    if (academicExperience) {
      const updatedAcademicExperience = await this.academicExperienceRepository.update(id, data);
      return updatedAcademicExperience;
    }
    throw new AppError('The academic experience with the given id was not found.')
  }
}

export default UpdateAcademicExperienceService;
