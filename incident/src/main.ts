import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { OPTIONS } from './main.option';

const logger = new Logger('Blog');
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, OPTIONS);
  app.listen();
  logger.log('incident microservice is listening');
}
bootstrap();
