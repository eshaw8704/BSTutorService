import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './TrafficStats.css';

// ✅ Function to get a date string in PST (America/Los_Angeles) timezone
function getPSTDateString(offsetDays = 0) {
  const pst = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(Date.now() - offsetDays * 24 * 60 * 60 * 1000));

  // Convert MM/DD/YYYY → YYYY-MM-DD
  const [month, day, year] = pst.split('/');
  return `${year}-${month}-${day}`;
}

export default function TrafficStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 30 }, (_, i) => {
      const date = getPSTDateString(29 - i); // start 29 days ago, end today
      return {
        date,
        visits: Math.floor(Math.random() * 60)
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
