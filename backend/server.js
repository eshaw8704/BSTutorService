import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from './routes/appointmentRoutes.js';

dotenv.config();
connectDB();
console.log(process.env.MONGO_URI);

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});