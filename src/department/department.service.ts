import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '@Department/entities/department.entity';

@Injectable()
export class DepartmentService {
  @InjectRepository(Department)
  private departmentRepository: Repository<Department>;

  async getDepartmentByName(department_name: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { department_name },
      relations: ['location'],
    });
    if (department) return department;
    throw new HttpException(
      'Department with this name does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
