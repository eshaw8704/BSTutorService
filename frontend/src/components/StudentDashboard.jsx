import React from 'react';
import './StudentDashboard.css';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleScheduleClick = () => {
    navigate('/appointments');
  };

  return (
    <div className="dashboard-wrapper">

      <div className="top-right-controls">
        <button className="settings-btn" onClick={handleSettingsClick}>⚙️</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <button className="profile-btn" onClick={handleProfileClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="profile-pic"
          />
        </button>
      </div>

      <div className="dashboard-main">

        <div className="left-panel">
          <button className="schedule-btn" onClick={handleScheduleClick}>
            Edit Appointments
          </button>

          <div className="appointments-box">
            <h3>Appointments</h3>
            <p className="subheading">Upcoming</p>
            <ul className="appointment-list">
              <li>📅 03/10/2025 - Monday 9:00am</li>
              <li>📅 03/11/2025 - Tuesday 2:00pm</li>
              <li>📅 03/12/2025 - Thursday 11:00am</li>
              <li>📅 03/13/2025 - Friday 5:00pm</li>
              <li>📅 03/17/2025 - Monday 3:00pm</li>
            </ul>
          </div>
        </div>

        <div className="info-box">
          <h2 className="dashboard-title">Student Dashboard</h2>
          <p className="dashboard-welcome">
            This page allows you to access all features on this website allowed by students. From editing profile to scheduling appointments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
