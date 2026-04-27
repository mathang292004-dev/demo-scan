import { IsString, IsIn } from 'class-validator';

export class FileUploadDTO {
  @IsString()
  incidentId: string;

  @IsIn(['image', 'audio'])
  type: 'image' | 'audio';
}
