import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class FileMetadataDTO {

  @ApiProperty()
  fileUrl: string;

  @ApiProperty()
  publicId: string;

  @ApiProperty()
  fileType: string;

}

class IncidentOverviewDTO {
  [key: string]: any; // allows any custom key-value fields
}

class AssetsDamageDTO {
  [key: string]: any; // allows dynamic key-value pairs
}

class PropertyDamageDTO {
  @ApiProperty()
  propertyType: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}

class UploadedFilesDTO {
  @ApiPropertyOptional({ type: [FileMetadataDTO] })
  images?: FileMetadataDTO[];

  @ApiPropertyOptional({ type: [FileMetadataDTO] })
  audio?: FileMetadataDTO[];

  @ApiPropertyOptional({ type: [FileMetadataDTO] })
  video?: FileMetadataDTO[];
}

export class IncidentDTO {
  @ApiProperty()
  incidentId: string;

  @ApiProperty()
  reportedBy: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  Branch: string;

  @ApiProperty({ example: new Date().toISOString(), type: String })
  reportedDate: Date;

  @ApiProperty()
  severityLevel: string;

  @ApiProperty()
  incidentStatus: string;

  @ApiProperty({ type: IncidentOverviewDTO })
  incidentOverview: IncidentOverviewDTO;

  @ApiProperty({ type: AssetsDamageDTO })
  AssetsDamage: AssetsDamageDTO;

  @ApiProperty({ type: [PropertyDamageDTO] })
  PropertyDamage: PropertyDamageDTO[];

  @ApiPropertyOptional({ type: UploadedFilesDTO })
  uploadedFiles: UploadedFilesDTO;
}
