import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '@Department/entities/department.entity';
import { DepartmentController } from '@Department/department.controller';
import { DepartmentService } from '@Department/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
