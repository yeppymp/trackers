import express from 'express';
import { summaryController } from '../controllers';

const router = express.Router();

router.get('/', summaryController.fetchSummary);
router.get('/:deviceId', summaryController.fetchSummaryDetail);

export default router;
