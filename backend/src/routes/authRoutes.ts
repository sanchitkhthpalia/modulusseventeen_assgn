import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/authController';

export const authRouter = Router();

authRouter.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  register
);

authRouter.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  login
);


