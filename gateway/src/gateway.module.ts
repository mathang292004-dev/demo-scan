import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import * as config from 'config';
import { RedisModule } from './redis.module';
import { HealthCheckMicroservicesServiceService } from './health-check/health-check-microservices-service.service';
import { HealthCheckMicroserviceController } from './health-check/health-check-microservice-controller';
import { CloudinaryService } from './cloudinaryService';
import { IncidentController } from './controllers/incident.controller';
import { IncidentService } from './services/incident.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

const redisConfig = config.get('redis');

const redisOptions = {
    host: redisConfig.host,
    port: redisConfig.port,
    retryAttempts: 9,
    retryDelay: 3000
}

@Module({
    imports:[
        BullModule.forRoot({
            redis: redisOptions
        }),
        RedisModule
    ],
    controllers: [HealthCheckMicroserviceController,IncidentController,AuthController],
    providers:[
        HealthCheckMicroservicesServiceService,
        CloudinaryService,
        IncidentService,
        AuthService,
    ]
})
export class GatewayModule {}
