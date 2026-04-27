import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { IncidentSharedModule } from 'src/incident-shared.module';

@Module({
  imports: [IncidentSharedModule],
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}
