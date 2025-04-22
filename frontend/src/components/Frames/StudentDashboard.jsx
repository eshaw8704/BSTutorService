import React from 'react';
import DashboardLayout from "../DashboardLayout";
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="dashboard-main">
        <div className="left-panel">
          <button className="schedule-btn" onClick={() => window.location.href = '/appointments'}>
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
    </DashboardLayout>
  );
};

export default StudentDashboard;
