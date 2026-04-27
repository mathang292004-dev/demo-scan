import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthService {
        constructor(@Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy) { }

        public async registerUser(user) {
            return await firstValueFrom(this.redisClient.send({ cmd: 'register_user' }, user));
        }

        public async loginUser(user) {
            return await firstValueFrom(this.redisClient.send({ cmd: 'login_user' }, user));
        }
    
}