import { injectable, inject } from 'tsyringe';

import IAcademicExperienceRepository from '../repositories/IAcademicExperienceRepository';
import AcademicExperience from '../infra/database/entities/AcademicExperience';

@injectable()
class GetAcademicExperienceService {
  constructor(
    @inject('AcademicExperienceRepository')
    private academicExperienceRepository: IAcademicExperienceRepository,
  ) { }

  public async execute(): Promise<Array<AcademicExperience>> {

    const academicExperience = await this.academicExperienceRepository.findAll();

    return academicExperience;
  }
}

export default GetAcademicExperienceService;
