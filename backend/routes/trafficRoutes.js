// routes/trafficRoutes.js
import express from 'express';
import { getTrafficData } from '../controllers/trafficController.js';

const router = express.Router();

router.get('/traffic', getTrafficData);

export default router;
