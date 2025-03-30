import React from 'react';
import './StudentDashboard.css';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any local storage/session if needed
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Top-right corner logout */}
      <div className="dashboard-header">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <h2 className="dashboard-title">Student Dashboard</h2>
      <p className="dashboard-welcome">Welcome!</p>

      <div className="dashboard-buttons">
        <button className="dashboard-button primary">Schedule Appointment</button>
        <button className="dashboard-button">View Appointments</button>
        <button className="dashboard-button">View Payments</button>
      </div>
    </div>
  );
};

export default StudentDashboard;
