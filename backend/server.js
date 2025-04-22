import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// Load env vars
dotenv.config();

// Debug: Make sure it's loading the URI
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not found in .env file");
  process.exit(1);
}

connectDB();

const app = express();
app.use(cors());

// Body parsers (MUST HAVE for req.body to work)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});