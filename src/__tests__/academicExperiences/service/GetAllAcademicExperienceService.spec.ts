import 'reflect-metadata';
import GetAllAcademicExperienceService from '../../../modules/academicExperiences/services/GetAllAcademicExperienceService'
import FakeAcademicExperienceRepository from '../fakesRepositories/FakeAcademicExperienceRepository'
import CreateAcademicExperienceService from '../../../modules/academicExperiences/services/CreateAcademicExperienceService'

describe('getAllAcademicExperience', () => {
  it('should be able to get all academic experience', async () => {
    const fakeAcademicExperienceRepository = new FakeAcademicExperienceRepository();
    const getAllAcademicExperienceService = new GetAllAcademicExperienceService(fakeAcademicExperienceRepository);
    const createAcademicExperience = new CreateAcademicExperienceService(fakeAcademicExperienceRepository);

    let initialDate = new Date();
    let finalDate = new Date();

    finalDate.setDate(finalDate.getDate() + 1);

    createAcademicExperience.execute({
      title: "Dev ops",
      category: "Developer",
      institution: "Google",
      initialDate,
      finalDate
    });
    createAcademicExperience.execute({
      title: "Dev ops2",
      category: "Developer",
      institution: "Google",
      initialDate,
      finalDate
    });
    const allAcademicExperience = await getAllAcademicExperienceService.execute();
    expect(allAcademicExperience.length).toBe(2);

  });
});
