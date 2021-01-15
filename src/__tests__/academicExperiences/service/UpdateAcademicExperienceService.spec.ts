import AcademicExperience from '@modules/academicExperiences/infra/database/entities/AcademicExperience';
import 'reflect-metadata';
import CreateAcademicExperienceService from '../../../modules/academicExperiences/services/CreateAcademicExperienceService'
import UpdateAcademicExperienceService from '../../../modules/academicExperiences/services/UpdateAcademicExperienceService'
import FakeAcademicExperienceRepository from '../fakesRepositories/FakeAcademicExperienceRepository'
import AppError from '@shared/errors/AppError';

describe('UpdateAcademicExperienceService.spec', () => {
  it('should be able to update a new academic experience', async () => {
    const fakeAcademicExperienceRepository = new FakeAcademicExperienceRepository();
    const createAcademicExperience = new CreateAcademicExperienceService(fakeAcademicExperienceRepository);
    const updateAcademicExperienceService = new UpdateAcademicExperienceService(fakeAcademicExperienceRepository);

    let finalDate = new Date();

    finalDate.setDate(finalDate.getDate() + 1);

    const academicExperience = await createAcademicExperience.execute({
      title: "Dev ops",
      category: "Developer",
      institution: "Google",
      initialDate: new Date(),
      finalDate
    })

    const updatedAcademicExperience = updateAcademicExperienceService.execute(academicExperience.id,
      Object.assign(
        new AcademicExperience(),
        {
          id: academicExperience.id,
          title: "Dev Ops1",
          category: "Developer",
          institution: "Google",
          initialDate: new Date("2015-03-11"),
          finalDate: new Date("2019-12-18")
        })
    );

    expect(Object.assign(updatedAcademicExperience, { title: "Dev Ops1" })).toMatchObject(updatedAcademicExperience);


  })
  it('should not be able to update a new academic experience', async () => {
    const fakeAcademicExperienceRepository = new FakeAcademicExperienceRepository();
    const updateAcademicExperienceService = new UpdateAcademicExperienceService(fakeAcademicExperienceRepository);

    expect(updateAcademicExperienceService.execute("21312312d12", Object.assign(
      new AcademicExperience(),
      {
        id: "21312312d12",
        title: "Dev Ops1",
        category: "Developer",
        institution: "Google",
        initialDate: new Date("2015-03-11"),
        finalDate: new Date("2019-12-18")
      }))).rejects.toBeInstanceOf(AppError);
  })
});
