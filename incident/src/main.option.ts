import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import * as config from 'config';

const serverConfig = config.get('server');

export const OPTIONS: NestMicroserviceOptions & MicroserviceOptions = {
  transport: Transport.REDIS,
  options: {
    host: serverConfig.host,
    port: serverConfig.port,
    retryAttempts: 9,
    retryDelay: 3000,
  },
};
