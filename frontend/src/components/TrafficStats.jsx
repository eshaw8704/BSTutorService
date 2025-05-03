// src/components/Frames/TrafficStats.jsx

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const TrafficStats = () => {
  const [todayData, setTodayData]     = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    const increaseVisit = async () => {
      try {
        await fetch('/api/admin/traffic', { method: 'POST' });
      } catch (err) {
        console.error('Error incrementing traffic:', err);
      }
    };

    const fetchToday = async () => {
      const res = await fetch('/api/admin/traffic');
      if (!res.ok) throw new Error('Failed to load today’s traffic');
      setTodayData(await res.json());
    };

    const fetchHistory = async () => {
      const res = await fetch('/api/admin/traffic/history?days=30');
      if (!res.ok) throw new Error('Failed to load traffic history');
      const data = await res.json();
      setHistoryData(
        data.map(item => ({
          date: item.date.slice(5), // render as MM-DD
          visits: item.visits
        }))
      );
    };

    increaseVisit()
      .then(() => Promise.all([fetchToday(), fetchHistory()]))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading traffic…</p>;
  if (error)   return <p className="status-msg error">Error: {error}</p>;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">📊 30-Day Traffic Overview</h2>
      <div className="mb-6">
        <strong>Visits Today:</strong> {todayData.visitsToday}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={historyData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#9146FF"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficStats;
