// backend/routes/trafficRoutes.js

import express from 'express';
import Traffic from '../models/Traffic.js';

const router = express.Router();

// POST /api/admin/traffic
router.post('/admin/traffic', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const traffic = await Traffic.findOneAndUpdate(
      { date: today },
      { $inc: { visits: 1 } },
      { new: true, upsert: true }
    );
    res.json(traffic);
  } catch (err) {
    console.error('Error updating traffic:', err);
    res.status(500).json({ message: 'Error updating traffic', error: err.message });
  }
});

// GET /api/admin/traffic
router.get('/admin/traffic', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const traffic = await Traffic.findOne({ date: today });
    res.json({
      visitsToday: traffic?.visits || 0,
      activeUsers: 5,
      pageViews:   traffic?.visits || 0,
    });
  } catch (err) {
    console.error('Error fetching traffic:', err);
    res.status(500).json({ message: 'Error fetching traffic', error: err.message });
  }
});

// GET /api/admin/traffic/history?days=7
router.get('/admin/traffic/history', async (req, res) => {
  const days = parseInt(req.query.days, 10) || 7;
  // compute start date (days-1 days ago)
  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - (days - 1));
  const startDate = startDateObj.toISOString().split('T')[0];

  try {
    // fetch all records from startDate onward
    const records = await Traffic.find({ date: { $gte: startDate } })
                                 .sort({ date: 1 })
                                 .lean();

    // build a full array of { date, visits } for each day
    const history = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      const dateStr = d.toISOString().split('T')[0];
      const rec = records.find(r => r.date === dateStr);
      history.push({ date: dateStr, visits: rec?.visits || 0 });
    }

    res.json(history);
  } catch (err) {
    console.error('Error fetching traffic history:', err);
    res.status(500).json({ message: 'Error fetching traffic history', error: err.message });
  }
});

export default router;
