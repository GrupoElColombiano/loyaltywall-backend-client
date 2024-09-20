import { Controller, Get, Param } from '@nestjs/common';
import { GeographyService } from './geography-module.service';

@Controller('geography')
export class GeographyController {
  constructor(private readonly geographyService: GeographyService) {}

  @Get('departments')
  async getAllDepartments() {
    return await this.geographyService.getAllDepartments();
  }

  @Get('departments/:id/cities')
  async getCitiesByDepartmentId(@Param('id') id: number) {
    return await this.geographyService.getCitiesByDepartmentId(id);
  }
}
