import React from 'react';
import './StudentDashboard.css';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Or open a dropdown/modal later
  };

  return (
    <div className="dashboard-wrapper">
      
      <div className="dashboard-header">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <button className="profile-btn" onClick={handleProfileClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="profile-pic"
          />
        </button>
      </div>

      <div className="dashboard-container">
        <h2 className="dashboard-title">Student Dashboard</h2>
        <p className="dashboard-welcome">Welcome!</p>

        <div className="dashboard-buttons">
          <button className="dashboard-button primary">Schedule Appointment</button>
          <button className="dashboard-button">View Appointments</button>
          <button className="dashboard-button">View Payments</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
