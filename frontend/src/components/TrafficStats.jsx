// src/components/Frames/TrafficStats.jsx
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './TrafficStats.css';

export default function TrafficStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // demo: 30 days of random small numbers
    const start = new Date('2025-04-05');
    const arr = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return {
        date: d.toISOString().slice(0,10),
        visits: Math.floor(Math.random()*60)
      };
    });
    setData(arr);
  }, []);
  

  return (
    <div className="traffic-card">
      <h3>30-Day Traffic Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 2" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#333', fontSize: 12 }}
            axisLine={{ stroke: '#999' }}
          />
          <YAxis
            tick={{ fill: '#333', fontSize: 12 }}
            axisLine={{ stroke: '#999' }}
          />

          {/* ← This gives you the hover‐tooltip following the cursor */}
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
}
