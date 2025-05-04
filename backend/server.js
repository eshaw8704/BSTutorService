import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import userRoutes        from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import payrollRoutes     from "./routes/payrollRoutes.js";
import adminRoutes       from "./routes/adminRoutes.js";
import paymentRoutes     from "./routes/paymentRoutes.js";   // ✅ IMPORTED
import webhookRoutes     from "./routes/webhookRoutes.js";   // ✅ IMPORTED

dotenv.config();

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();
// Standard middleware
app.use(express.json()); // ⬅️ Safe to use after webhook route
app.use(cors());

// Webhook raw body parser (required by Stripe)
app.use('/api/webhook', express.raw({ type: 'application/json' })); // ⬅️ Required *before* express.json()

// Routes
app.use("/api/users",        userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payroll",      payrollRoutes);
app.use("/api/admin",        adminRoutes);
app.use("/api",              paymentRoutes);
app.use("/api",              webhookRoutes);

// Health check
app.get("/", (_req, res) => res.send("API is running…"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
