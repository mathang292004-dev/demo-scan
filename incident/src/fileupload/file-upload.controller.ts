import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileUploadService } from './file-upload.service';

@Controller('fileUpload')
export class FileUploadController {
  private logger = new Logger('FileUploadController');

  constructor(private readonly fileUploadService: FileUploadService) {}

  @MessagePattern({ cmd: 'create_incident' })
  async createIncident(@Payload() data: any): Promise<any> {
    // console.log('Received in microservice:', data);
    const parsedData = JSON.parse(data);
    return await this.fileUploadService.createIncident(parsedData);
  }

  


}
