import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import asyncHandler from '../middleware/async.middleware';

import SummaryService from '../services/summary.service';

const summaryService = SummaryService.getInstance();

const fetchSummary = asyncHandler(async (req: Request, res: Response) => {
  const data = await summaryService
    .setAccessToken(res.locals.accessToken)
    .setRequestHeaders(req.headers)
    .fetchSummary();

  return res.status(StatusCodes.OK).json(data);
});

const fetchSummaryDetail = asyncHandler(async (req: Request, res: Response) => {
  const { deviceId } = req.params;

  const data = await summaryService
    .setAccessToken(res.locals.accessToken)
    .setRequestHeaders(req.headers)
    .fetchSummaryDetail(deviceId);

  return res.status(StatusCodes.OK).json(data);
});

export const summaryController = {
  fetchSummary,
  fetchSummaryDetail,
};
