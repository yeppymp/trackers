import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const ACCESS_TOKEN_KEY = 'auth-access-token';

export default (req: Request, res: Response, next: NextFunction) => {
  const accessToken = <string>req.headers[ACCESS_TOKEN_KEY];

  if (!accessToken) return res.send(StatusCodes.UNAUTHORIZED);

  res.locals.accessToken = accessToken;

  next();
};
