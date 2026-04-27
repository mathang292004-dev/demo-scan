import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { IncidentProviders } from './providers/incident.providers';
import { CommonService } from './services/common-service';
import { AiService } from './services/ai-service';

@Module({
  imports: [DatabaseModule],
  providers: [...IncidentProviders, CommonService,AiService],
  exports: [DatabaseModule, ...IncidentProviders, CommonService,AiService],
})
export class IncidentSharedModule {}
