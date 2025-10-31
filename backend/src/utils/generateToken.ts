import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export function generateAccessToken(userId: string): string {
  return jwt.sign({ sub: userId }, config.jwtSecret, { expiresIn: '7d' });
}


