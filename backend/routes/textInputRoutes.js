import express from "express";
import { handleTextInput } from "textInputController.js";

// This route handles text input events
const router = express.Router();

// Route to handle text input submissions
router.post("/textinput", handleTextInput);

export default router;
