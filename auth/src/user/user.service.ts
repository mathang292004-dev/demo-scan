import { Inject, Injectable, Logger, ConflictException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from 'common-dto'
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class UserService {
  private logger = new Logger('UserService');



  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {
    console.log("jwt_key", jwtConfig);
  }

  async registerUser(data: { userName: string; email: string; password: string }) {
    this.logger.log('registerUser');

    const existingUser = await this.userModel.findOne({ email: data.email }).lean().exec();
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createdUser = await this.userModel.create({
      userName: data.userName,
      email: data.email,
      password: hashedPassword,
    });

    const userObj = createdUser.toObject ? createdUser.toObject() : createdUser;
    const { password, ...userWithoutPassword } = userObj;

    return userWithoutPassword;
  }

  async loginUser(data: any) {
    this.logger.log('loginUser');
    const { email, password } = data;

    const existingUser = await this.userModel.findOne({ email }).lean().exec();
    if (!existingUser) {
      return null;
    }

    const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatched) {
      return null;
    }

    // Sign JWT token with user data (excluding password)
    console.log("jwt_key", jwtConfig.secret);

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role || 'user',
      },
      jwtConfig.secret,
      { expiresIn: '60m' },
    );

    return {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role || 'user',
      token,
    };
  }

  // async loginUser(data: any) {
  //   this.logger.log('loginUser');
  //   const { email, password } = data;

  //   try {
  //     const existingUser = await this.userModel.findOne({ email }).lean().exec();
  //     if (!existingUser) {
  //       this.logger.warn(`User not found: ${email}`);
  //       return null;
  //     }

  //     const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
  //     if (!isPasswordMatched) {
  //       this.logger.warn(`Invalid password for: ${email}`);
  //       return null;
  //     }

  //     const token = jwt.sign(
  //       {
  //         id: existingUser._id,
  //         email: existingUser.email,
  //         role: existingUser.role || 'user',
  //       },
  //       jwtConfig.secret,
  //       { expiresIn: '60m' },
  //     );

  //     return {
  //       id: existingUser._id,
  //       email: existingUser.email,
  //       role: existingUser.role || 'user',
  //       token,
  //     };
  //   } catch (error) {
  //     this.logger.error('Error in loginUser', error.stack);
  //     throw new Error('Something went wrong, please try again later');
  //   }
  // }

}
