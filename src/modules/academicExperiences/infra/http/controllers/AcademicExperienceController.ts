import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAcademicExperienceService from '@modules/academicExperiences/services/CreateAcademicExperienceService';
import DeleteAcademicExperienceService from '@modules/academicExperiences/services/DeleteAcademicExperienceService';
import GetAcademicExperienceService from '@modules/academicExperiences/services/GetAcademicExperienceService';
import GetAllAcademicExperienceService from '@modules/academicExperiences/services/GetAllAcademicExperienceService';
import UpdateAcademicExperienceService from '@modules/academicExperiences/services/UpdateAcademicExperienceService';

export default class AcademicExperienceController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, category, institution, initialDate, finalDate } = request.body;

    const createAcademicExperience = container.resolve(CreateAcademicExperienceService);

    const academicExperience = await createAcademicExperience.execute({ title, category, institution, initialDate, finalDate });

    return response.json(academicExperience);
  }
  public async findById(request: Request, response: Response): Promise<Response> {

    const createAcademicExperience = container.resolve(GetAcademicExperienceService);

    const academicExperience = await createAcademicExperience.execute(request.params.id);

    return response.json(academicExperience);

  }
  public async findAll(request: Request, response: Response): Promise<Response> {

    const allAcademicExperience = container.resolve(GetAllAcademicExperienceService);

    const academicExperiences = await allAcademicExperience.execute();

    return response.json(academicExperiences);

  }
  public async delete(request: Request, response: Response): Promise<Response> {

    const deleteAcademicExperienceService = container.resolve(DeleteAcademicExperienceService);

    const deletedAcademicExperience = await deleteAcademicExperienceService.execute(request.params.id);

    return response.status(204).json(deletedAcademicExperience);

  }
  public async update(request: Request, response: Response): Promise<Response> {

    const updateAcademicExperienceService = container.resolve(UpdateAcademicExperienceService);

    const academicExperienceUpdated = await updateAcademicExperienceService.execute(request.params.id, request.body);

    return response.json(academicExperienceUpdated);

  }
}
