import React, { useEffect, useState } from 'react';
import DashboardLayout from "../DashboardLayout";
import './TutorDashboard.css';
import UpcomingAppointmentsFrame from '../UpcomingAppointments';


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
    <DashboardLayout role="tutor">
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
    </DashboardLayout>
  );
} 
