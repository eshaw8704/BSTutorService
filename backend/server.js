import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
<<<<<<< HEAD
console.log(process.env.MONGO_URI);
=======
connectDB();
>>>>>>> d5e8ece6e7f57ec5f937d116f1507f92b1f6892f

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
