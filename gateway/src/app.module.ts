import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway.module';
import { RedisModule } from './redis.module';
import { ConfigService } from './config/config.service';
import { IncidentController } from './controllers/incident.controller';
import { IncidentService } from './services/incident.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [GatewayModule, RedisModule],
  controllers: [ AppController],
  providers: [AppService,],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         { path: 'auth/login', method: RequestMethod.POST },
//         { path: 'auth/register', method: RequestMethod.POST },
//         { path: 'auth/logout', method: RequestMethod.POST }
//       )
//       .forRoutes('*'); // Apply to all other routes
//   }
// }
export class AppModule{}
