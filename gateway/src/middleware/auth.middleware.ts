// auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const JWT_SECRET = config.get('jwt');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('=== AUTH MIDDLEWARE DEBUG ===');
    
    let token: string | null = null;
    
    // First, try to extract token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization || '';
    console.log('Full Authorization header:', authHeader);
    console.log('Header length:', authHeader.length);
    console.log('All headers:', Object.keys(req.headers));

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove "Bearer " prefix
      console.log('✅ Token extracted from Authorization header:', token);
    } else {
      // Fallback: try to extract token from cookies
      const cookies = req.cookies;
      console.log('Cookies found:', cookies);
      
      if (cookies && cookies.jwt_token) {
        token = cookies.jwt_token;
        console.log('✅ Token extracted from cookies:', token);
      } else {
        console.log('❌ No token found in Authorization header or cookies');
        throw new UnauthorizedException('Authentication token is missing. Please login to get a valid token.');
      }
    }

    console.log('Token length:', token?.length);
    console.log('Token is null?', token === 'null');
    console.log('Token is undefined?', token === 'undefined');
    console.log('Token is empty?', token === '');

    // Check if token is valid (not null, undefined, or empty)
    if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
      console.log('❌ Token is invalid:', token);
      throw new UnauthorizedException('JWT token is missing or invalid. Please login again to get a new token.');
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET.secret);
      (req as any).user = decoded;
      console.log('✅ Token verified successfully for user:', decoded);
      console.log('=== END AUTH MIDDLEWARE DEBUG ===');
      next();
    } catch (error) {
      console.log('❌ JWT verification failed:', error.message);
      console.log('=== END AUTH MIDDLEWARE DEBUG ===');
      throw new UnauthorizedException('Invalid or expired JWT token. Please login again to get a new token. Error: ' + error.message);
    }
  }
}
