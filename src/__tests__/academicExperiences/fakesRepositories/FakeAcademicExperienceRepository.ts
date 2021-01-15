import { v4 } from 'uuid';
import IAcademicExperienceRepository from '@modules/academicExperiences/repositories/IAcademicExperienceRepository';
import ICreateAcademicExperienceDTO from '@modules/academicExperiences/dtos/ICreateAcademicExperienceDTO';
import AppError from '@shared/errors/AppError';
import AcademicExperience from '../../../modules/academicExperiences/infra/database/entities/AcademicExperience';

class AcademicExperienceRepository implements IAcademicExperienceRepository {
  private academicExperiences: Array<AcademicExperience> = [];
  public async create({ title, category, institution, initialDate, finalDate }: ICreateAcademicExperienceDTO): Promise<AcademicExperience> {

    const newAcademicExperienceData = { id: v4(), title, category, institution, initialDate, finalDate };

    const verifyError = Object.entries(newAcademicExperienceData).reduce((accumulate, [key, value]) => {

      if (value === "") {
        accumulate += "Dado " + key + " " + " vazio";
      }
      else if ((key === "initialDate" || key === "finalDate") && Object.prototype.toString.call(value) !== "[object Date]") {
        accumulate += "Dado " + key + " " + " data inválida";
      }
      return accumulate;
    }, "")

    if (verifyError !== "") {
      throw new Error(verifyError);
    }

    if (initialDate.getTime() > finalDate.getTime()) {
      throw new Error("Data final menor que a data inicial");
    }

    this.academicExperiences.push(newAcademicExperienceData);

    return newAcademicExperienceData;
  }
  public async findById(id: string): Promise<AcademicExperience | undefined> {
    const findAcademicExperience = this.academicExperiences.find(academicExperience => academicExperience.id === id);

    return findAcademicExperience;
  }
  public async findAll(): Promise<AcademicExperience[]> {
    return this.academicExperiences;
  }

  public async delete(id: string): Promise<void> {

    const oldAcademicExperiencesLenth = this.academicExperiences.length;
    this.academicExperiences = this.academicExperiences.filter((academicExperience) => academicExperience.id.toString() !== id.toString());
    if(oldAcademicExperiencesLenth - 1 !== this.academicExperiences.length){
      throw new AppError("The academic experience with the given id was not found.")
    }
  }

  public async update(id: string, data: AcademicExperience): Promise<AcademicExperience> {
    this.academicExperiences = this.academicExperiences.map((academicExperience) => {
      if (academicExperience.id === id) Object.assign(academicExperience, data);
      return academicExperience;
    });
    return data;

  }

}

export default AcademicExperienceRepository;
