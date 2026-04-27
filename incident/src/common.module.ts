import { Module } from '@nestjs/common';
import { CommonService } from './services/common-service';
import { IncidentModule } from './incident/incident.module';
import { FileUploadModule } from './fileupload/file-upload.module';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [IncidentModule, FileUploadModule, AudioModule],
  providers: [CommonService],
  exports: [CommonService, IncidentModule, FileUploadModule],
})
export class commonModule {}
