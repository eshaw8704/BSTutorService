// ✅ TutorDashboard.jsx (Full File with Review Pay Statement functionality)

import React, { useEffect, useState } from 'react';
import './TutorDashboard.css';

export default function TutorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const tutorId = localStorage.getItem("userId");
    if (!tutorId) {
      console.error("Tutor ID not found in localStorage.");
      return;
    }

    fetch(`http://localhost:5000/api/appointments/tutor/${tutorId}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Error fetching appointments:", err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handlePayReview = async () => {
    const tutorId = localStorage.getItem("userId");
    const adminId = "66117562b8d123456789abcd"; // Replace with real admin ID

    try {
      const res = await fetch('http://localhost:5000/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutor: tutorId,
          confirmedHours: 10,        // Example static values
          nonConfirmedHours: 2,
          confirmedBy: adminId
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Payroll recorded successfully!");
        console.log(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting payroll:", error);
      alert("Error submitting payroll");
    }
  };

  return (
    <div className="tutor-dashboard-wrapper">
      {/* Top bar */}
      <div className="top-bar">
        <div className="logo-title">
          <img src="/yellowBS.png" alt="Logo" className="dashboard-logo" />
          <h1>BSTutors</h1>
        </div>

        <input className="search-bar" type="text" placeholder="Search..." />

        <div className="top-actions">
          <button className="icon-button">＋</button>
          <button className="icon-button">⚙️</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <img
            className="avatar"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Avatar"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="dashboard-content">
        {/* Appointments */}
        <div className="dashboard-section">
          <h2>Appointments</h2>
          <div className="card">
            <h3>Upcoming</h3>
            {appointments.length > 0 ? (
              appointments.map((apt, i) => (
                <div key={apt._id || i} className="appointment">
                  <strong>Tutoring Appointment</strong>
                  <p>{new Date(apt.appointmentTime).toLocaleString()}</p>
                  <p>Student: {apt.student?.firstName} {apt.student?.lastName}</p>
                  <p>Subject: {apt.subject}</p>
                </div>
              ))
            ) : (
              <p>No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Dashboard Info */}
        <div className="dashboard-section">
          <div className="card">
            <h3>Tutor Dashboard</h3>
            <p>This page allows tutors to look at appointment schedules, review pay statements, and receive notifications on upcoming events.</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="dashboard-section">
          <div className="card">
            <h3>Notifications</h3>
            <p>No new notifications</p>
          </div>
        </div>

        {/* Pay Statement */}
        <div className="dashboard-section full-width">
          <button className="pay-btn" onClick={handlePayReview}>✓ Review Pay Statement</button>
        </div>
      </div>
    </div>
  );
}
