import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthSharedModule } from 'src/auth.shared.module';

@Module({
  imports: [AuthSharedModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
