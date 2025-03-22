import express from "express";
import { handleTextInput } from "textInputController.js";

const router = express.Router();

router.post("/textinput", handleTextInput);

export default router;
