import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('jobs')
export class Job {
  @ApiProperty()
  @PrimaryColumn()
  job_id: string;

  @ApiProperty()
  @Column()
  job_title: string;

  @ApiProperty()
  @Column({ nullable: true })
  min_salary: number;

  @ApiProperty()
  @Column({ nullable: true })
  max_salary: number;
}
