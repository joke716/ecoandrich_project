import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '@Employee/entities/employee.entity';
import { PageOptionsDto } from '@Common/dtos /page-options.dto';
import { PageDto } from '@Common/dtos /page.dto';
import { PageMetaDto } from '@Common/dtos /page-meta.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getEmployeeList(
    pageOptionsDto: PageOptionsDto,
    email?: string,
    job?: string[],
    department?: number[],
  ): Promise<PageDto<Employee>> {
    const queryBuilder =
      await this.employeeRepository.createQueryBuilder('employees');

    queryBuilder.leftJoinAndSelect('employees.job', 'job');
    queryBuilder.leftJoinAndSelect('employees.department', 'department');

    if (email !== undefined) {
      queryBuilder.andWhere('employees.email = :email', {
        email,
      });
    }

    if (job !== undefined) {
      if (Array.isArray(job)) {
        // Handle multiple job values
        queryBuilder.andWhere('employees.job IN (:...job)', {
          job,
        });
      } else {
        // Handle a single job value
        queryBuilder.andWhere('employees.job = :job', {
          job,
        });
      }
    }

    if (department !== undefined) {
      if (Array.isArray(department)) {
        // Handle multiple department values
        queryBuilder.andWhere('employees.department IN (:...department)', {
          department,
        });
      } else {
        // Handle a single department value
        queryBuilder.andWhere('employees.department = :department', {
          department,
        });
      }
    }

    await queryBuilder
      .orderBy('employees.hire_date', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async getEmployeeInfoById(employee_id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { employee_id },
      relations: ['job', 'department'],
    });
    if (employee) return employee;
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async increaseSalaryByDepartment(
    departmentId: number,
    increaseRate: number,
  ): Promise<void> {
    const employees = await this.employeeRepository.find({
      where: { department: { department_id: departmentId } },
    });

    for (const employee of employees) {
      employee.salary *= 1 + increaseRate / 100;
      await this.employeeRepository.save(employee);
    }
  }

  async updateEmployeeInfo(
    employee_id: number,
    updatedInfo: Partial<Employee>,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { employee_id },
    });
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(employee, updatedInfo);
    return await this.employeeRepository.save(employee);
  }
}
