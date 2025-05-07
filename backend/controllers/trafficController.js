// backend/controllers/trafficController.js
import Traffic from "../models/Traffic.js";

/**
 * GET /api/admin/traffic
 * Returns today’s visits count.
 */
export const getTrafficData = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const record = await Traffic.findOne({ date: today });
    return res.json({ visits: record?.visits || 0 });
  } catch (err) {
    console.error("Error fetching traffic data:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

/**
 * GET /api/admin/traffic/history?days=30
 * Returns an array of { date, visits } for the last N days.
 */
export const getTrafficHistory = async (req, res) => {
  try {
    const days = parseInt(req.query.days, 10) || 30;
    const history = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const date = d.toISOString().slice(0, 10);
      const rec = await Traffic.findOne({ date });
      history.push({
        date,
        visits: rec?.visits || 0
      });
    }

    return res.json(history);
  } catch (err) {
    console.error("Error fetching traffic history:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
