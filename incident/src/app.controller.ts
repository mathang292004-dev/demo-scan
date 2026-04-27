import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { HealthCheckMicroServiceInterface } from './HealthCheckMicroServiceInterface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'health_check_incident' })
  healthCheck(): HealthCheckMicroServiceInterface {
    console.log('Incident microservice is online');
    return { success: true };
  }
}
