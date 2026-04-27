import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as config from 'config';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './user/user.module';

const redisConfig = config.get('redis');

const redisOptions = {
  host: redisConfig.host,
  port: redisConfig.port,
  retryAttempts: 9,
  retryDelay: 3000,
};

@Module({
  imports: [
    BullModule.forRoot({
      redis: redisOptions,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
