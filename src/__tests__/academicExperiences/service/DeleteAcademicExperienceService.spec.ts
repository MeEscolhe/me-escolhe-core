import 'reflect-metadata';
import DeleteAcademicExperienceService from '../../../modules/academicExperiences/services/DeleteAcademicExperienceService'
import FakeAcademicExperienceRepository from '../fakesRepositories/FakeAcademicExperienceRepository'
import CreateAcademicExperienceService from '../../../modules/academicExperiences/services/CreateAcademicExperienceService'

describe('DeleteAcademicExperience', () => {
  it('should be able to delete a new academic experience', async () => {
    const fakeAcademicExperienceRepository = new FakeAcademicExperienceRepository();
    const deleteAcademicExperience = new DeleteAcademicExperienceService(fakeAcademicExperienceRepository);
    const createAcademicExperience = new CreateAcademicExperienceService(fakeAcademicExperienceRepository);

    let finalDate = new Date();

    finalDate.setDate(finalDate.getDate() + 1);

    const academicExperience = await createAcademicExperience.execute({
      title: "Dev ops",
      category: "Developer",
      institution: "Google",
      initialDate: new Date(),
      finalDate
    });

    await deleteAcademicExperience.execute(academicExperience.id);

  })
});
