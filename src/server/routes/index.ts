import express from 'express';

import authMiddleware from '../middleware/auth.middleware';

import auth from './auth.route';
import summary from './summary.route';

const router = express.Router();

router.use('/auth', auth);

router.use(authMiddleware);

router.use('/summary', summary);

router.use((_req, res) => res.status(404).json('API route not found'));

export default router;
