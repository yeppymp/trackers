import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import asyncHandler from '../middleware/async.middleware';

import AuthService from '../services/auth.service';

import { IRegister, ILogin } from '../interfaces/auth.interface';

const authService = AuthService.getInstance();

const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object().keys({
  username: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const register = asyncHandler(
  async (req: Request<{}, {}, IRegister>, res: Response) => {
    const payload = await registerSchema.validateAsync(req.body);

    const data = await authService
      .setRequestHeaders(req.headers)
      .register(payload);

    return res.status(StatusCodes.OK).json(data);
  },
);

const login = asyncHandler(
  async (req: Request<{}, {}, ILogin>, res: Response) => {
    const payload = await loginSchema.validateAsync(req.body);

    const { username, password } = payload;
    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');

    const data = await authService
      .setAccessToken(encodedToken)
      .setRequestHeaders(req.headers)
      .login(payload);

    const { loginToken } = data.response.message;

    return res.status(StatusCodes.OK).json({ username, token: loginToken });
  },
);

export const authController = {
  register,
  login,
};
