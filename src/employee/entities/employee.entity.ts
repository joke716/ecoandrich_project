import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Job } from '@Employee/entities/job.entity';
import { Department } from '@Department/entities/department.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('employees')
export class Employee {
  @ApiProperty()
  @PrimaryColumn()
  employee_id: number;

  @ApiProperty()
  @Column({ nullable: true })
  first_name: string;

  @ApiProperty()
  @Column()
  last_name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  phone_number: string;

  @ApiProperty()
  @Column()
  hire_date: Date;

  @ApiProperty()
  @ManyToOne(() => Job, (job: Job) => job.job_id)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ApiProperty()
  @Column()
  salary: number;

  @ApiProperty()
  @Column({ nullable: true })
  commission_pct: number;

  @ApiProperty()
  @Column({ nullable: true })
  manager_id: number;

  @ApiProperty()
  @ManyToOne(
    () => Department,
    (department: Department) => department.department_id,
  )
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
