import type { NextFunction, Request, Response } from 'express';

import HttpError from '../utils/errors/HttpError';
import ValidationError from '../utils/errors/ValidationError';
import HttpException from '../exceptions/HttpException';
import logger from '../libraries/Logger';

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err?.response) {
    const httpError = new HttpError(err);

    logger.error(JSON.stringify(httpError.response));

    return res.status(httpError.status).json(httpError.response);
  }

  if (err.name === 'ValidationError') {
    const validationError = new ValidationError(err);

    logger.error(JSON.stringify(validationError.response));

    return res.status(validationError.status).json(validationError.response);
  }

  const error = {
    source: 'internal',
    statusCode: err.status || 500,
    message: err.message || 'Something went wrong',
  };

  logger.error(JSON.stringify(error));

  return res.status(error.statusCode).json({ error });
};
