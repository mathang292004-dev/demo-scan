import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Incident } from 'common-dto';
import { IncidentService } from 'src/incident/incident.service';

@Injectable()
export class FileUploadService {
  private logger = new Logger('FileUploadService');

  constructor(
    @Inject('INCIDENT_MODEL') private incidentModel: Model<any>,
    private incidentService: IncidentService
  ) { }

  async createIncident(payload: any): Promise<any> {
    try {
      const { result, incidentId } = payload;

      if (Array.isArray(result)) {
        throw new Error('Invalid payload: expected a single file object, not an array');
      }

      const fileObj = {
        fileUrl: result.secure_url,
        publicId: result.public_id,
        fileType: result.resource_type,
        // fileName:result.original_filename
      };

      if (incidentId) {
        const typeKey = fileObj.fileType === 'image' ? 'images'
          : fileObj.fileType === 'audio' ? 'audio'
            : fileObj.fileType === 'video' ? 'video'
              : null;

        if (!typeKey) {
          throw new Error('Unsupported file type');
        }

        const updatedIncident = await this.incidentModel.findOneAndUpdate(
          { incidentId: incidentId },
          {
            $push: {
              [`uploadedFiles.${typeKey}`]: {
                fileUrl: fileObj.fileUrl,
                publicId: fileObj.publicId,
                fileType: fileObj.fileType,
              },
            },
          },
          { new: true }
        );

        if (!updatedIncident) {
          throw new Error('Incident not found');
        }

        return {
          message: 'File updated successfully',
          data: updatedIncident,
        };

      } else {
        // Create new incident with single file object
        const createdIncident = await this.incidentService.createIncident(fileObj);

        return {
          message: 'Incident created with file',
          data: {
            incident: createdIncident,
          },
        };
      }
    } catch (error) {
      console.error('uploadAttachment error:', error.message);
      throw new Error(`Failed to upload attachment: ${error.message}`);
    }
  }





  // async deleteAttachment(publicId: string): Promise<void> {
  //     try {
  //         // Try to find the incident that contains the publicId in images or audio
  //         const incident = await this.incidentModel.findOne({
  //             $or: [
  //                 { 'uploadedFiles.images.publicId': publicId },
  //                 { 'uploadedFiles.audio.publicId': publicId }
  //             ]
  //         });

  //         if (!incident) {
  //             this.logger.warn(`No incident found with publicId: ${publicId}`);
  //             throw new BadRequestException(`No incident found with publicId: ${publicId}`);
  //         }

  //         let updateField: string | null = null;

  //         // Determine which array contains the publicId
  //         const isImage = incident.uploadedFiles?.images?.some(file => file.publicId === publicId);
  //         const isAudio = incident.uploadedFiles?.audio?.some(file => file.publicId === publicId);

  //         if (isImage) {
  //             updateField = 'uploadedFiles.images';
  //         } else if (isAudio) {
  //             updateField = 'uploadedFiles.audio';
  //         }

  //         if (!updateField) {
  //             throw new BadRequestException(`File with publicId ${publicId} not found in any category.`);
  //         }

  //         // Perform the deletion
  //         const result = await this.incidentModel.updateOne(
  //             { _id: incident._id },
  //             { $pull: { [updateField]: { publicId: publicId } } }
  //         );

  //         if (result.modifiedCount === 0) {
  //             this.logger.warn(`File with publicId ${publicId} was not removed.`);
  //         } else {
  //             this.logger.log(`File with publicId ${publicId} deleted successfully.`);
  //         }

  //     } catch (error) {
  //         this.logger.error(`Failed to delete attachment: ${error.message}`);
  //         throw new BadRequestException(`Failed to delete attachment: ${error.message}`);
  //     }
  // }
}
