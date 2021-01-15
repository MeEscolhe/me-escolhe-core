
import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';
import { IsDate, IsNotEmpty } from "class-validator";
import { IsBeforeDate } from "class-validator-date";


@Entity('academicExperiences')
class AcademicExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column()
  category: string;

  @IsNotEmpty()
  @Column()
  institution: string;

  @Column('timestamp with time zone')
  @IsDate()
  @IsBeforeDate('finalDate')
  initialDate: Date;

  @Column('timestamp with time zone')
  @IsDate()
  finalDate: Date;
}

export default AcademicExperience;
