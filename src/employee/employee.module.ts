import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@Employee/entities/employee.entity';
import { Region } from '@Employee/entities/region.entity';
import { Country } from '@Employee/entities/country.entity';
import { Job } from '@Employee/entities/job.entity';
import { Location } from '@Employee/entities/location.entity';
import { EmployeeController } from '@Employee/employee.controller';
import { EmployeeService } from '@Employee/employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Region, Country, Location, Job]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
