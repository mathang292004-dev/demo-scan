import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import { writeFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //cors:true
  });
  // Enable CORS with options
  app.enableCors({
    origin: "*", // match FE exactly
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH' ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
      'X-Request-Start-Time'
    ],
    credentials: true, // if using cookies or auth headers
  });


  app.setGlobalPrefix('api');

  // Add cookie parser middleware
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Emergex')
    .setDescription('Emergex Sample APIs')
    .setVersion('1.0')
    .addServer('/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  writeFileSync('swagger-spec.json', JSON.stringify(document, null, 2));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
