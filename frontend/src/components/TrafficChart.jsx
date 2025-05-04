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
import './TrafficStats.css'; // we’ll create this next

const TrafficStats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch your 30-day data, then call setData(...)
    // your data should look like:
    // [{ date: '2025-04-05', visits: 0 }, …, { date: '2025-05-04', visits: 52 }]
  }, []);

  return (
    <div className="traffic-card">
      <h3>30-Day Traffic Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          {/* light-mode grid */}
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 2" />

          {/* light-mode axes */}
          <XAxis
            dataKey="date"
            tick={{ fill: '#333', fontSize: 12 }}
            axisLine={{ stroke: '#999' }}
          />
          <YAxis
            tick={{ fill: '#333', fontSize: 12 }}
            axisLine={{ stroke: '#999' }}
          />

          {/* tooltip that follows the cursor */}
          <Tooltip
            cursor={{ stroke: '#8884d8', strokeWidth: 2 }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              fontSize: '0.9rem'
            }}
            labelStyle={{ color: '#555' }}
            itemStyle={{ color: '#8884d8' }}
          />

          {/* your line */}
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#8884d8"
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficStats;
