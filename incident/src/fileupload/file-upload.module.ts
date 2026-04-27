import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { IncidentProviders } from 'src/providers/incident.providers';

import { IncidentSharedModule } from 'src/incident-shared.module';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { IncidentService } from 'src/incident/incident.service';

@Module({
  imports: [IncidentSharedModule, DatabaseModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, ...IncidentProviders,IncidentService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
