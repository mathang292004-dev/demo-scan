import {
  Body,
  Controller,
  Logger,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from 'src/services/auth.service';
import { UserDto } from 'common-dto';
import { LoginDto } from 'common-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserDto })
  @ApiOkResponse({ description: 'User created successfully' })
  async register(@Body() user: UserDto) {
    try {
      const result = await this.authService.registerUser(user);
      return result;
    } catch (error) {
      this.logger.error(`Register error: ${error.message}`, error.stack);
      return {
        success: false,
        message: 'Registration failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'User logged in successfully' })
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.loginUser(payload);

      if (result.statusCode === HttpStatus.OK && result.data?.token) {
        const { token, ...userData } = result.data;
        
        // Set JWT token as HTTP-only cookie
        res.cookie('jwt_token', token, {
          httpOnly: true, // Prevents JavaScript access
          secure: process.env.NODE_ENV === 'production', // HTTPS only in production
          sameSite: 'strict', // CSRF protection
          maxAge: 60 * 60 * 1000, // 60 minutes (matches JWT expiry)
          path: '/', // Cookie available across the site
        });

        // Return user data without token in response body
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'Login successful',
          user: userData,
        });
      } else {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout user' })
  async logout(@Res() res: Response) {
    // Clear the JWT cookie
    res.clearCookie('jwt_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logged out successfully. JWT token cookie has been cleared.',
    });
  }
}
