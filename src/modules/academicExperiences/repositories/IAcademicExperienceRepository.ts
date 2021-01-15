import AcademicExperience from '../infra/database/entities/AcademicExperience';
import ICreateAcademicExperienceDTO from '../dtos/ICreateAcademicExperienceDTO';

export default interface IAcademicExperiencesRepository {
  create(data: ICreateAcademicExperienceDTO): Promise<AcademicExperience>;
  findById(id: string): Promise<AcademicExperience | undefined>;
  findAll(): Promise<Array<AcademicExperience>>;
  update(id: string, data: AcademicExperience): Promise<AcademicExperience>;
  delete(id: string): Promise<void>;
}
