import 'reflect-metadata';
import GetAcademicExperienceService from '../../../modules/academicExperiences/services/GetAcademicExperienceService'
import FakeAcademicExperienceRepository from '../fakesRepositories/FakeAcademicExperienceRepository'
import CreateAcademicExperienceService from '../../../modules/academicExperiences/services/CreateAcademicExperienceService'
import AppError from '@shared/errors/AppError';

describe('getAcademicExperience', () => {
  it('should be able to get a academic experience', async () => {
    const fakeAcademicExperienceRepository = new FakeAcademicExperienceRepository();
    const getAcademicExperienceService = new GetAcademicExperienceService(fakeAcademicExperienceRepository);
    const createAcademicExperience = new CreateAcademicExperienceService(fakeAcademicExperienceRepository);

    let initialDate = new Date();
    let finalDate = new Date();

    finalDate.setDate(finalDate.getDate() + 1);

    const academicExperience = await createAcademicExperience.execute({
      title: "Dev ops",
      category: "Developer",
      institution: "Google",
      initialDate,
      finalDate
    });

    const getAcademicExperience = await getAcademicExperienceService.execute(academicExperience.id);

    expect(getAcademicExperience).toMatchObject(
      {
        title: "Dev ops",
        category: "Developer",
        institution: "Google",
        initialDate,
        finalDate
      });

  });
  it('should not be able to get a academic experience', async () => {
    const fakeAcademicExperienceRepository = new FakeAcademicExperienceRepository();
    const getAcademicExperienceService = new GetAcademicExperienceService(fakeAcademicExperienceRepository);

    expect(getAcademicExperienceService.execute("12312312312d1213")).rejects.toBeInstanceOf(AppError);

  });
});
