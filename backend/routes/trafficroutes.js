// backend/routes/trafficroutes.js
import express from "express";
import {
  getTrafficData,
  getTrafficHistory
} from "../controllers/trafficController.js";

const router = express.Router();

// Public (if you want) and Admin–accessible
router.get("/admin/traffic", getTrafficData);

// Admin history chart
router.get("/admin/traffic/history", getTrafficHistory);

export default router;
