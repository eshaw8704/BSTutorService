import express from "express";
import { handleButtonClick } from "buttonController.js";

const router = express.Router();

// Route to handle button clicks and text submissions
router.post("/submit", handleButtonClick);

export default router;
