import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
//console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
    connectDB();
});
