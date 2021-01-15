import { injectable, inject } from 'tsyringe';

import IAcademicExperienceRepository from '../repositories/IAcademicExperienceRepository';

@injectable()
class DeleteAcademicExperienceService {
  constructor(
    @inject('AcademicExperienceRepository')
    private academicExperienceRepository: IAcademicExperienceRepository,
  ) { }

  public async execute(id: string): Promise<void> {

    await this.academicExperienceRepository.delete(id);

  }
}

export default DeleteAcademicExperienceService;
