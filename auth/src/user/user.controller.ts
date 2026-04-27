import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CommonService } from 'src/service/common.service';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');

  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'register_user' })
  async register(data: { userName: string; email: string; password: string }) {
    try {
      this.logger.log('register');
      if (!data?.email || !data?.password || !data?.userName) {
        return this.commonService.errorMessage(
          'userName, email and password are required',
          HttpStatus.BAD_REQUEST,
          this.logger,
          new Error('ValidationError: Missing required fields'),
        );
      }
      const user = await this.userService.registerUser(data);
      return this.commonService.successMessage(
        user,
        'User registered successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      if (error?.status === HttpStatus.CONFLICT) {
        return this.commonService.errorMessage(
          'User already exists',
          HttpStatus.CONFLICT,
          this.logger,
          error,
        );
      }
      return this.commonService.errorMessage(
        'Something went wrong, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
        this.logger,
        error,
      );
    }
  }

  @MessagePattern({ cmd: 'login_user' })
  async login(data: { email: string; password: string }) {
    try {
      this.logger.log('login');
      if (!data?.email || !data?.password) {
        return this.commonService.errorMessage(
          'Email and password are required',
          HttpStatus.BAD_REQUEST,
          this.logger,
          new Error('ValidationError: Missing email or password'),
        );
      }

      const user = await this.userService.loginUser(data);
      if (!user) {
        return this.commonService.errorMessage(
          'Invalid credentials or user not found',
          HttpStatus.UNAUTHORIZED,
          this.logger,
          new Error('Invalid credentials'),
        );
      }

      return this.commonService.successMessage(
        user,
        'Login successful',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.commonService.errorMessage(
        'Something went wrong, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
        this.logger,
        error,
      );
    }
  }

  @MessagePattern({ cmd: 'logout_user' })
  async logout() {
    // Usually handled client-side by deleting token/cookie,
    // or you can handle token blacklist here.
    return this.commonService.successMessage(
      null,
      'Logged out successfully',
      HttpStatus.OK,
    );
  }
}
