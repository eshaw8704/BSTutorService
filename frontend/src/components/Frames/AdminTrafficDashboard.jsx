// src/components/Frames/AdminTrafficDashboard.jsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './AdminTrafficDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminTrafficDashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/traffic/history?days=30')
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => setHistory(data))
      .catch(err => console.error('History fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{color:'#fff'}}>Loading…</p>;
  if (!history.length) return <p style={{color:'#fff'}}>No data.</p>;

  const chartData = {
    labels: history.map(d => d.date),
    datasets: [{
      label: 'Visits per Day',
      data: history.map(d => d.visits),
      fill: false,
      borderColor: '#6a0dad',
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: '#6a0dad'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#fff' } },
      tooltip: { bodyColor: '#000' }
    },
    scales: {
      x: { ticks: { color: '#ccc' } },
      y: { beginAtZero: true, ticks: { color: '#ccc' } }
    }
  };

  return (
    <div
      className="traffic-dashboard"
      style={{
        height: 400,
        background: '#1e1e2f',
        borderRadius: 10,
        padding: '1rem'
      }}
    >
      <h2 style={{ color: '#fff', margin: 0 }}>📈 30-Day Traffic Overview</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
