// components/TrafficChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import './TrafficChart.css';


const TrafficChart = ({ data }) => {
  const chartData = {
    labels: ['Page Views', 'Unique Visitors', 'Bounce Rate'],
    datasets: [
      {
        label: 'Traffic Metrics',
        data: [data.pageViews, data.uniqueVisitors, data.bounceRate],
        backgroundColor: ['#6a0dad', '#8a2be2', '#9370db'],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default TrafficChart;
