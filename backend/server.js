import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import payrollRoutes from './routes/payrollRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load env vars
dotenv.config();
console.log("✅ Environment variables loaded", process.env.PORT);

// Debug: Make sure it's loading the URI
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
<<<<<<< HEAD

app.use('/api', paymentRoutes); // Use payment routes
app.use('/api', webhookRoutes);
app.use('/api', appointmentRoutes);

=======
app.use("/api/appointments", appointmentRoutes);
>>>>>>> main

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const PORT = process.env.PORT;

// Call connectDB before starting the server
const startServer = async () => {
  await connectDB(); // Connects to MongoDB
  app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  });
};

startServer();

