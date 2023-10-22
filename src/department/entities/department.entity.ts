import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Location } from '@Employee/entities/location.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '@Employee/entities/employee.entity';
import { Country } from '@Employee/entities/country.entity';

@Entity('departments')
export class Department {
  @ApiProperty()
  @PrimaryColumn()
  department_id: number;

  @ApiProperty()
  @Column()
  department_name: string;

  @ApiProperty()
  @Column({ nullable: true })
  // @ManyToOne(() => Employee, (employee: Employee) => employee.employee_id)
  // @JoinColumn({ name: 'manager_id' })
  manager_id: number;

  @ApiProperty()
  @ManyToOne(() => Location, (location: Location) => location.location_id)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}
