import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { HealthCheckMicroServiceInterface } from './healthCheckMicroserviceInterface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

    @MessagePattern({ cmd: 'health_check_auth' })
  healthCheck(): HealthCheckMicroServiceInterface {
    console.log('Auth microservice is online');
    return { success: true };
  }
}
