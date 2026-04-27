import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommonService } from 'src/services/common-service';
import { IncidentDTO } from 'common-dto';
import { CONSTANT_MSG } from 'common-dto';

@Controller('incident')
export class IncidentController {
  private logger = new Logger('IncidentController');

  constructor(
    private incidentService: IncidentService,
    private commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'get_all_incidents' })
  async getAllIncidents(@Payload() params: any): Promise<any> {
    try {
      this.logger.log('get_all_incidents called');

      const result = await this.incidentService.getAllIncidents(params);

      return this.commonService.successMessage(
        result,
        CONSTANT_MSG.INCIDENTS_RETRIEVED_SUCCESSFULLY,
        HttpStatus.OK,
        CONSTANT_MSG.SUCCESS,
      );
    } catch (error) {
      return this.commonService.errorMessage(
        CONSTANT_MSG.ERROR_GETTING_ALL_INCIDENTS,
        HttpStatus.INTERNAL_SERVER_ERROR,
        this.logger,
        error,
      );
    }
  }

  @MessagePattern({ cmd: 'get_incident_by_id' })
  async getIncidentById(@Payload() incidentId: string): Promise<any> {
    try {
      const result = await this.incidentService.getIncidentById(incidentId);
      if (result) {
        return this.commonService.successMessage(
          result,
          CONSTANT_MSG.GET_INCIDENT_BY_ID_SUCCESSFULLY,
          HttpStatus.OK,
          CONSTANT_MSG.SUCCESS,
        );
      } else {
        return this.commonService.successMessage(
          result,
          CONSTANT_MSG.INCIDENT_NOT_FOUND,
          HttpStatus.NOT_FOUND,
          CONSTANT_MSG.FAILED,
        );
      }
    } catch (error) {
      return this.commonService.errorMessage(
        CONSTANT_MSG.INCIDENT_NOT_FOUND_BY_ID,
        HttpStatus.INTERNAL_SERVER_ERROR,
        this.logger,
        error,
      );
    }
  }

  // @MessagePattern({ cmd: 'update_incident' })
  // async updateIncident(@Payload() Payload: IncidentDTO): Promise<any> {
  //   try {
  //     const result = await this.incidentService.updateIncident(Payload);
  //     if (result) {
  //       return this.commonService.successMessage(
  //         result,
  //         CONSTANT_MSG.CREATE_INCIDENT_SUCCESSFULLY,
  //         HttpStatus.OK,
  //         CONSTANT_MSG.SUCCESS,
  //       );
  //     } else {
  //       return this.commonService.successMessage(
  //         result,
  //         CONSTANT_MSG.CREAT_INCIDENT_FAILED,
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //         CONSTANT_MSG.FAILED,
  //       );
  //     }
  //   } catch (error) {
  //     return this.commonService.errorMessage(
  //       CONSTANT_MSG.CREAT_INCIDENT_FAILED,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       this.logger,
  //       error,
  //     );
  //   }
  // }

  // @MessagePattern({ cmd: 'get_incident_status_count' })
  // async getIncidentStatusCount(): Promise<any> {
  //     try {
  //         const result = await this.incidentService.getIncidentStatusCount();
  //         if (result) {
  //             return this.commonService.successMessage(result, CONSTANT_MSG.GET_INCIDENT_COUNT_SUCCESS, HttpStatus.OK,CONSTANT_MSG.SUCCESS);
  //         } else {
  //             return this.commonService.successMessage(result, CONSTANT_MSG.GET_INCIDENT_COUNT_FAILED, HttpStatus.INTERNAL_SERVER_ERROR,CONSTANT_MSG.FAILED);
  //         }
  //     } catch (error) {
  //         return this.commonService.errorMessage(
  //             CONSTANT_MSG.GET_INCIDENT_COUNT_FAILED,
  //             HttpStatus.INTERNAL_SERVER_ERROR, this.logger, error
  //         );
  //     }
  // }
}
