import express from 'express';
import { createPayroll } from '../controllers/payrollController.js';

const router = express.Router();

router.post('/', createPayroll);

export default router;
