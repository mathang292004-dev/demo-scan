import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import * as config from 'config';

const redisConfig = config.get('redis');
@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {};
        this.envConfig.redisService = {
            options: {
                host: redisConfig.host,
                port: redisConfig.port,
                retryAttempts: 9,
                retryDelay: 3000
            },
            transport: Transport.REDIS
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
