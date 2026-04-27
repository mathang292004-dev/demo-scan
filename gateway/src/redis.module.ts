import { Module } from '@nestjs/common';
import * as config from 'config';
import { ClientProxyFactory } from "@nestjs/microservices";
import { ConfigService } from './config/config.service';


const redisConfig = config.get('redis');

const redisOptions = {
    host: redisConfig.host,
    port: redisConfig.port,
    retryAttempts: 9,
    retryDelay: 3000
}


const RedisService = {
    provide: 'REDIS_SERVICE',
    useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('redisService'));
    },
    inject: [
        ConfigService
    ]
}

@Module({
    imports:[],
    providers:[ConfigService,RedisService],
    exports:[RedisService]
})
export class RedisModule {}
