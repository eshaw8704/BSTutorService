import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from './routes/appointmentRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';

dotenv.config();
console.log(process.env.MONGO_URI);

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use('/api', appointmentRoutes);
app.use('/api/payroll', payrollRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

