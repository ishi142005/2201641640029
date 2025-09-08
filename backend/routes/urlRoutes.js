import express from 'express';
import { createShortURL, redirectURL, getStats } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorturls', createShortURL);
router.get('/shorturls/:code', getStats);
router.get('/:code', redirectURL);

export default router;
