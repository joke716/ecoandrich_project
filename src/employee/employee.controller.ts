import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeService } from '@Employee/employee.service';
import { PageOptionsDto } from '@Common/dtos /page-options.dto';
import { PageDto } from '@Common/dtos /page.dto';
import { Employee } from '@Employee/entities/employee.entity';

@Controller('employee')
@ApiTags('Employee Info')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'job', required: false, type: String })
  @ApiQuery({ name: 'department', required: false, type: String })
  @ApiOperation({
    summary: `Get All Employees`,
    description: 'Get All Employees & Pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Employee,
    isArray: true,
  }) // 성공 응답 정의
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // 실패 응답 정의
  async getUserList(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('email') email: string,
    @Query('job') job: string[],
    @Query('department') department: number[],
  ): Promise<PageDto<Employee>> {
    return this.employeeService.getEmployeeList(
      pageOptionsDto,
      email,
      job,
      department,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: `Get Employee Info By ID`,
    description: `Get Employee Info By ID`,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Employee,
  }) // 성공 응답 정의
  @ApiNotFoundResponse({
    status: 404,
    description: 'User with this id does not exist',
  }) // id 없음 응답 정의
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  }) // 실패 응답 정의
  async getUserDetailById(@Param('id') id: number): Promise<Employee> {
    return await this.employeeService.getEmployeeInfoById(id);
  }

  @Put('salary/:departmentId')
  @ApiBody({
    schema: {
      properties: {
        increaseRate: { type: 'number' },
      },
    },
  })
  async increaseSalaryByDepartment(
    @Param('departmentId') departmentId: number,
    @Body('increaseRate') increaseRate: number,
  ): Promise<void> {
    await this.employeeService.increaseSalaryByDepartment(
      departmentId,
      increaseRate,
    );
  }

  @Put('update/:employeeId')
  async updateEmployeeInfo(
    @Param('employeeId') employeeId: number,
    @Body() updatedInfo: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeeService.updateEmployeeInfo(employeeId, updatedInfo);
  }
}
