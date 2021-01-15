import { getRepository, Repository, UpdateResult } from 'typeorm';
import { validate } from "class-validator";

import IAcademicExperienceRepository from '@modules/academicExperiences/repositories/IAcademicExperienceRepository';
import ICreateAcademicExperienceDTO from '@modules/academicExperiences/dtos/ICreateAcademicExperienceDTO';
import AcademicExperience from '../entities/AcademicExperience';
import ClassValidatorError from '@shared/errors/ClassValidatorError';

class AcademicExperienceRepository implements IAcademicExperienceRepository {
  private ormRepository: Repository<AcademicExperience>;

  constructor() {
    this.ormRepository = getRepository(AcademicExperience);
  }

  public async create({ title, category, institution, initialDate, finalDate }: ICreateAcademicExperienceDTO): Promise<AcademicExperience> {
    const academicExperience = this.ormRepository.create({ title, category, institution, initialDate, finalDate });
    const errors = await validate(academicExperience);
    if (errors.length > 0) {
      throw new ClassValidatorError(errors);
    }
    await this.ormRepository.save(academicExperience);

    return academicExperience;
  }
  public async findById(id: string): Promise<AcademicExperience | undefined> {
    const academicExperience = await this.ormRepository.findOne({ where: { id } });
    return academicExperience;
  }
  public async findAll(): Promise<AcademicExperience[]> {
    const academicExperience = await this.ormRepository.find();
    return academicExperience;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async update(id: string, data: AcademicExperience): Promise<AcademicExperience> {

    const updatedAcademicExperience = await this.ormRepository.save({ ...data, id });

    return updatedAcademicExperience;

  }

}

export default AcademicExperienceRepository;
