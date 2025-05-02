import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import userRoutes        from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import payrollRoutes     from "./routes/payrollRoutes.js";
import adminRoutes       from "./routes/adminRoutes.js";
import trafficRoutes from "./routes/trafficRoutes.js"; 


dotenv.config();

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();
app.use(express.json());
app.use(cors());

// Mount routers
app.use("/api/users",        userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payroll",      payrollRoutes);
app.use("/api/admin",        adminRoutes);
app.use("/api/traffic",      trafficRoutes);

// Health check
app.get("/", (_req, res) => res.send("API is running…"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
