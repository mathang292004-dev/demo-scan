import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckMicroservicesServiceService } from './health-check-microservices-service.service';

@ApiTags('Incident')
@Controller('health')
export class HealthCheckMicroserviceController {
  constructor(
    private readonly healthService: HealthCheckMicroservicesServiceService,
  ) {}

  async onModuleInit() {
    console.log(
      (await this.checkHealthIncidentMicroservice()) ? 'incident service Online' : 'incident service offline',
      (await this.checkHealthAUthMicroservice()) ? 'auth service Online' : 'auth service offline',
    );
  }

  @Get()
  @ApiOperation({ summary: 'Check health of incident microservice' })
  @ApiResponse({ status: 200, description: 'incident service health status.' })
  async checkHealthIncidentMicroservice() {
    // Directly return the result from the service
    const success = await this.healthService.healthCheckincident();
    console.log('sucess', success);

    return success;
  }

  @Get()
  @ApiOperation({ summary: 'Check health of auth microservice' })
  @ApiResponse({ status: 200, description: 'auth service health status.' })
  async checkHealthAUthMicroservice() {
    // Directly return the result from the service
    const success = await this.healthService.healthCheckAuth();
    console.log('sucess', success);

    return success;
  }
}
