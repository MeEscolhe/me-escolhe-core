import 'reflect-metadata';
import CreateAcademicExperienceService from '../../../modules/academicExperiences/services/CreateAcademicExperienceService'
import FakeAcademicExperienceRepository from '../fakesRepositories/FakeAcademicExperienceRepository'

describe('CreateAcademicExperience', () => {
  it('should be able to create a new academic experience', async () => {
    const fakeAcademicExperienceRepository = new FakeAcademicExperienceRepository();
    const createAcademicExperience = new CreateAcademicExperienceService(fakeAcademicExperienceRepository);
    let finalDate = new Date();

    finalDate.setDate(finalDate.getDate() + 1);

    await createAcademicExperience.execute({
      title: "Dev ops",
      category: "Developer",
      institution: "Google",
      initialDate: new Date(),
      finalDate
    })
  })
  it('should not be able to create a new academic experience', async () => {
    const fakeAcademicExperienceRepository = new FakeAcademicExperienceRepository();
    const createAcademicExperience = new CreateAcademicExperienceService(fakeAcademicExperienceRepository);

    expect(createAcademicExperience.execute({
      title: "",
      category: "Developer",
      institution: "Google",
      initialDate: new Date("2015-03-11"),
      finalDate: new Date("2019-12-18")
    })).rejects.toBeInstanceOf(Error);
  })
});
