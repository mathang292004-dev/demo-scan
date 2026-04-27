import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OPTIONS } from './main.option';
import { Logger } from '@nestjs/common';
import { RedisOptions } from '@nestjs/microservices';

const logger = new Logger('Blog');
async function bootstrap() {
const app = await NestFactory.createMicroservice<RedisOptions>(AppModule, OPTIONS);
  app.listen();
  logger.log('incident microservice is listening');
}
bootstrap();
