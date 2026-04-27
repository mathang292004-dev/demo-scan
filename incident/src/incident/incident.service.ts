import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import {  Incident } from 'common-dto';
import { IncidentDTO } from 'common-dto';
import { CommonService } from 'src/services/common-service';
import { CONSTANT_MSG } from 'common-dto';

@Injectable()
export class IncidentService {
  private logger = new Logger('IncidentService');

  constructor(
    @Inject('INCIDENT_MODEL') private incidentModel: Model<Incident>,
    private commonService: CommonService,
  ) { }

  async getAllIncidents(payload): Promise<any> {
    const params = this.commonService.makeListParams(payload);
    const condition = this.commonService.getFilterParams(payload, params);

    // const total = await this.incidentModel.countDocuments(condition);

    const list = await this.incidentModel
      .find(condition)
      .sort(params.sortFilter)
      .skip(params.skip)
      .limit(params.limit)
      .exec();

    const statusCount = await this.getIncidentStatusCount();

    return {
      // total,
      page: payload.page || 0,
      limit: params.limit,
      statusCount,
      result: list,
    };
  }

  async getIncidentById(
    incidentId: string,
  ): Promise<Incident | { message: string }> {
    const result = await this.incidentModel.findOne({ incidentId });
    if (!result) {
      return { message: CONSTANT_MSG.INCIDENT_NOT_FOUND };
    }
    return result;
  }

  async createIncident(attachment: any): Promise<any> {
    const incidentId = this.commonService.generateIncidentId();

    const uploadedFiles: Record<string, any[]> = {
      images: [],
      audio: [],
      video: [],
    };

    const typeKey = attachment.fileType === 'image' ? 'images'
      : attachment.fileType === 'audio' ? 'audio'
        : attachment.fileType === 'video' ? 'video'
          : null;

    if (!typeKey) {
      throw new Error('Unsupported file type in createIncident');
    }

    uploadedFiles[typeKey].push({
      fileUrl: attachment.fileUrl,
      publicId: attachment.publicId,
      fileType:attachment.fileType
    });

    const incidentData = {
      incidentId,
      uploadedFiles,
      isDeleted: false,
      incidentStatus: 'Draft',
    };

    const createdIncident = new this.incidentModel(incidentData);
    return createdIncident.save();
  }



  async getIncidentStatusCount(): Promise<Record<string, number>> {
    const result = await this.incidentModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$incidentStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCount: Record<string, number> = {
      total: 0,
    };

    for (const item of result) {
      statusCount[item._id] = item.count;
      statusCount.total += item.count;
    }

    return statusCount;
  }

  async updateIncident(payload): Promise<any> {
    // const {incidentId, }
  }

}
