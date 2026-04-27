import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, of, timeout } from 'rxjs';

@Injectable()
export class HealthCheckMicroservicesServiceService {
    constructor(@Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy) { }


      onModuleDestroy() {
        this.redisClient.close();
    }

    async healthCheckincident(): Promise<any> {
         const incidentService: any = await this.redisClient.send({ cmd: "health_check_incident" }, {})
            .pipe(timeout(1000),
                catchError(val => {
                    return of({ success: false });
                })
            )
            .toPromise();
        return incidentService.success
    }

    async healthCheckAuth(): Promise<any>{
        const authService: any = await this.redisClient.send({ cmd: "health_check_auth" }, {})
            .pipe(timeout(1000),
                catchError(val => {
                    return of({ success: false });
                })
            )
            .toPromise();
        return authService.success
    }
}
