import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from './routes/appointmentRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; // Import payment routes
import webhookRoutes from './routes/webhookRoutes.js'; // Import webhook routes

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
app.use(cors());


app.use("/api/users", userRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', paymentRoutes); // Use payment routes
app.use('/api', webhookRoutes);
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
