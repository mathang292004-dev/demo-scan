import { Transport, RedisOptions } from '@nestjs/microservices';
import * as config from 'config';

const serverConfig = config.get('server');

export const OPTIONS: RedisOptions  = {
  transport: Transport.REDIS,
  options: {
    host: serverConfig.host,
    port: serverConfig.port,
    retryAttempts: 9,
    retryDelay: 3000,
  },
};
