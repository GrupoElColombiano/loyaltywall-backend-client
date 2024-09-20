import { Controller, Get } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('template')
@Unprotected() // Controller is unprotected
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}
  @Get('list')
  findAll() {
    return this.templateService.findAll();
  }
}
