// file-upload.dto.request.ts

// upload-attachment.dto.ts
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { AttachmentType } from 'common-dto';

export class UploadAttachmentDto {
  @IsNotEmpty({ message: 'File is required' })
  @Type(() => Object)
  file: Express.Multer.File[];

  @IsEnum(AttachmentType, { message: 'Type must be either image or audio' })
  @IsNotEmpty({ message: 'Type is required' })
  type: AttachmentType;

  @IsString({ message: 'Incident ID must be a string' })
  @IsNotEmpty({ message: 'Incident ID is required' })
  incidentId: string;
}

export class FileUploadResponseDto {
  message: string;
  url: string;
  public_id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: Date;
}
