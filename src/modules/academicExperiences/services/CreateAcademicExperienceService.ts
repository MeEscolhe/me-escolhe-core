import { injectable, inject } from 'tsyringe';

import ICreateAcademicExperienceDTO from '../dtos/ICreateAcademicExperienceDTO'
import IAcademicExperienceRepository from '../repositories/IAcademicExperienceRepository';
import AcademicExperience from '../infra/database/entities/AcademicExperience';

@injectable()
class CreateAcademicExperienceService {
  constructor(
    @inject('AcademicExperienceRepository')
    private academicExperienceRepository: IAcademicExperienceRepository,
  ) { }

  public async execute({ title, category, institution, initialDate, finalDate }: ICreateAcademicExperienceDTO): Promise<AcademicExperience> {

    const academicExperience = await this.academicExperienceRepository.create({ title, category, institution, initialDate, finalDate });

    return academicExperience;
  }
}

export default CreateAcademicExperienceService;
