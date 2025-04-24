import React, { useState, useEffect } from 'react';
import DashboardLayout from "../DashboardLayout";
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/appointments/upcoming', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setAppointments(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout role="student">
      <div className="dashboard-main">
        <div className="left-panel">
          <button
            className="schedule-btn"
            onClick={() => window.location.href = '/appointments/schedule'}
          >
            Schedule / Edit Appointments
          </button>

          <div className="appointments-box">
            <h3>Appointments</h3>
            <p className="subheading">Upcoming</p>

            {loading ? (
              <p>Loading…</p>
            ) : error ? (
              <p className="error">Error: {error}</p>
            ) : appointments.length === 0 ? (
              <p>No upcoming appointments.</p>
            ) : (
              <ul className="appointment-list">
                {appointments.map(appt => {
                  const dt = new Date(appt.appointmentDate);
                  const dateStr = dt.toLocaleDateString(undefined, {
                    month: '2-digit', day: '2-digit', year: 'numeric'
                  });
                  const timeStr = appt.appointmentTime; // already formatted
                  return (
                    <li key={appt._id}>
                      📅 {dateStr} — {timeStr} ({appt.subject})
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="info-box">
          <h2 className="dashboard-title">Student Dashboard</h2>
          <p className="dashboard-welcome">
            Welcome back! Manage your upcoming sessions or explore other features.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
