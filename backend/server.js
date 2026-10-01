// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

import userRoutes        from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import payrollRoutes     from "./routes/payrollRoutes.js";
import trafficRoutes     from "./routes/trafficRoutes.js";
import adminRoutes       from "./routes/adminRoutes.js";
import paymentRoutes     from "./routes/paymentRoutes.js";
import webhookRoutes     from "./routes/webhookRoutes.js";

import Traffic from "./models/Traffic.js";

dotenv.config();
await connectDB();

const app = express();

// Webhook raw body parser (required by Stripe)
app.use('/api/webhook', express.raw({ type: 'application/json' })); // ⬅️ Required *before* express.json()

// Standard middleware
app.use(express.json()); // ⬅️ Safe to use after webhook route
app.use(cors());

// — Visit-logging middleware (before your routes)
app.use(async (req, res, next) => {
  try {
    // Only count page visits for your front-end routes.
    // e.g. skip /api/* if you prefer. Here we count all GET requests:
    if (req.method === "GET" && !req.path.startsWith("/api/webhook")) {
      const today = new Date().toISOString().slice(0, 10);
      await Traffic.findOneAndUpdate(
        { date: today },
        { $inc: { visits: 1 } },
        { upsert: true }
      );
    }
  } catch (err) {
    console.error("Visit logging error:", err);
  }
  next();
});

// — Mount routes
app.use("/api", trafficRoutes);        // handles /api/admin/traffic/*
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", paymentRoutes);
app.use("/api", webhookRoutes);

// — Serve the built frontend (production); in dev, Vite serves it instead
const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../frontend/dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  // Send index.html for client-side routes (anything that isn't an API call)
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distDir, "index.html"));
  });
} else {
  // — Health check
  app.get("/", (_req, res) => res.send("API is running…"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
