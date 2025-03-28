import React from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Student Dashboard</h2>
      <p className="dashboard-welcome">Welcome, Elijah!</p>

      <div className="dashboard-buttons">
        <button className="dashboard-button primary">Schedule Appointment</button>
        <button className="dashboard-button">View Appointments</button>
        <button className="dashboard-button">View Payments</button>
      </div>
    </div>
  );
};

export default StudentDashboard;
