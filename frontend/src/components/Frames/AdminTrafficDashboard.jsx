import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './AdminTrafficDashboard.css';

const AdminTrafficDashboard = () => {
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/traffic')
      .then(res => res.json())
      .then(data => {
        setTrafficData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load traffic data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading traffic stats...</p>;
  if (!trafficData) return <p>Error loading data.</p>;

  const chartData = {
    labels: ['Page Views', 'Unique Visitors', 'Bounce Rate'],
    datasets: [{
      label: 'Traffic Stats',
      backgroundColor: '#6a0dadbb',
      data: [
        trafficData.pageViews,
        trafficData.uniqueVisitors,
        trafficData.bounceRate
      ]
    }]
  };

  return (
    <div className="traffic-dashboard">
      <h2>📈 Site Traffic</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default AdminTrafficDashboard;