import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from '@Department/department.service';
import { Department } from '@Department/entities/department.entity';

@Controller('department')
@ApiTags('Department Info')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':department_name')
  @ApiOperation({
    summary: `Get department Info By Name`,
    description: `Get department Info By Name`,
  })
  async getDepartmentInfoByName(
    @Param('name') name: string,
  ): Promise<Department> {
    return await this.departmentService.getDepartmentByName(name);
  }
}
