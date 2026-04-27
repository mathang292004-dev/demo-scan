import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { IncidentProviders } from 'src/providers/incident.providers';
import { DatabaseModule } from 'src/config/database.module';
import { IncidentSharedModule } from 'src/incident-shared.module';

@Module({
  imports: [IncidentSharedModule, DatabaseModule],
  controllers: [AudioController],
  providers: [AudioService, ...IncidentProviders],
  exports: [AudioService]
})
export class AudioModule { }
