import { Module } from '@nestjs/common';
import { GeographyController } from './geography-module.controller';
import { GeographyService } from './geography-module.service';

@Module({
  controllers: [GeographyController],
  providers: [GeographyService],
})
export class GeographyModule {}
