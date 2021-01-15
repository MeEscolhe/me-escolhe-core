import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAcademicExperience1609707556276 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'academicExperiences',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'category',
          type: 'varchar',
        },
        {
          name: 'institution',
          type: 'varchar',
        },
        {
          name: 'initialDate',
          type: 'timestamp',
        },
        {
          name: 'finalDate',
          type: 'timestamp',
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('academicExperiences');
  }

}
