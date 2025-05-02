// backend/server.js
import express from 'express';
import dotenv  from 'dotenv';
import cors    from 'cors';
import { connectDB } from './config/db.js';

import userRoutes        from './routes/userRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import payrollRoutes     from './routes/payrollRoutes.js';
import trafficRoutes     from './routes/trafficroutes.js';   // Traffic endpoints
import adminRoutes       from './routes/adminRoutes.js';
import paymentRoutes     from './routes/paymentRoutes.js';
import webhookRoutes     from './routes/webhookRoutes.js';

dotenv.config();

// ─── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const app = express();

// ─── Webhook raw‐body parser (must come before express.json) ────────────────────
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());  // parse JSON bodies
app.use(cors());          // enable CORS

// ─── API ROUTES ────────────────────────────────────────────────────────────────
// Public & user‐related
app.use('/api/users', userRoutes);

// Appointments
app.use('/api/appointments', appointmentRoutes);

// Payroll (tutor/admin)
app.use('/api/payroll', payrollRoutes);

// Traffic (must be before adminRoutes so /api/admin/traffic is handled here)
app.use('/api', trafficRoutes);

// Admin area (other admin endpoints)
app.use('/api/admin', adminRoutes);

// Payments & webhooks
app.use('/api', paymentRoutes);
app.use('/api', webhookRoutes);

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.send('API is running…'));

// ─── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
