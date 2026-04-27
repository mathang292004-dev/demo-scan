import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import * as config from 'config';
import { ScheduleModule } from '@nestjs/schedule';
import { commonModule } from './common.module';
import { FileUploadModule } from './fileupload/file-upload.module';
import { AudioModule } from './audio/audio.module';

const redisConfig = config.get('redis');

const redisOptions = {
  host: redisConfig.host,
  port: redisConfig.port,
  retryAttempts: 9,
  retryDelay: 3000,
};

@Module({
  imports: [
    commonModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: redisOptions,
    }),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
