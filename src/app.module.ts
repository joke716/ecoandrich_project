import { Module } from '@nestjs/common';
import { AppController } from '@Root/app.controller';
import { AppService } from '@Root/app.service';
import { DatabaseModule } from '@Database/database.module';
import { AppconfigModule } from '@Root/config/appconfig.module';
import { EmployeeModule } from '@Employee/employee.module';
import { DepartmentModule } from '@Department/department.module';

@Module({
  imports: [AppconfigModule, DatabaseModule, EmployeeModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
