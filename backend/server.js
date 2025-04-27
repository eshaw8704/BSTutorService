// server.js (or app.js)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import userRoutes        from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import payrollRoutes     from "./routes/payrollRoutes.js";
import adminRoutes       from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// === MOUNT API ROUTES ===
app.use("/api/users",        userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payroll",      payrollRoutes);
app.use("/api/admin",        adminRoutes);

// Health-check endpoint
app.get("/", (req, res) => {
  res.send("API is running…");
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
