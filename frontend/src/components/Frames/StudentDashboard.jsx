import React, { useState, useEffect } from 'react';
import DashboardLayout from "../DashboardLayout";
import './StudentDashboard.css';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/appointments/upcoming', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-stub-user-id': localStorage.getItem('userId')
          }
        });
        if (!res.ok) throw new Error('Could not load appointments');
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  function formatDateTime(dateStr, timeStr) {
    const [year, month, day] = dateStr.split('-'); // "YYYY-MM-DD"
    const formatted = `${parseInt(month)}/${parseInt(day)}/${year}`;
    return `${formatted} @ ${timeStr || 'Time N/A'}`;
  }

  const now = new Date();
  const upcomingAppointments = appointments.filter(a => new Date(a.appointmentDate) >= now);
  const pastAppointments = appointments.filter(a => new Date(a.appointmentDate) < now);

  return (
    <DashboardLayout role="student">
      <div className="dashboard-main">
        <div className="left-panel">
          <button
            className="schedule-btn"
            onClick={() => (window.location.href = '/appointments')}
          >
            Edit Appointments
          </button>
        </div>

        <div className="info-box">
          <h2 className="dashboard-title">Student Dashboard</h2>
          <p className="dashboard-welcome">
            Welcome to your dashboard! <br />
            <br />
            Here you can schedule, reschedule, cancel and view upcoming and past appointments! If you need any additional information, please contact us at bstutorservice@gmail.com
          </p>
        </div>
      </div>

      <div className="appointments-section">
        <h3>Upcoming Appointments</h3>
        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : upcomingAppointments.length === 0 ? (
          <p>No upcoming appointments</p>
        ) : (
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Tutor</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((appt, i) => (
                <tr key={i}>
                  <td>{formatDateTime(appt.appointmentDate, appt.appointmentTime)}</td>
                  <td>{appt.tutor ? `${appt.tutor.firstName} ${appt.tutor.lastName}` : 'Unknown'}</td>
                  <td>{appt.subject || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="appointments-section">
        <h3>Appointment History</h3>
        {loading ? (
          <p>Loading…</p>
        ) : pastAppointments.length === 0 ? (
          <p>No past appointments</p>
        ) : (
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Tutor</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {pastAppointments.map((appt, i) => (
                <tr key={i}>
                  <td>{formatDateTime(appt.appointmentDate, appt.appointmentTime)}</td>
                  <td>{appt.tutor ? `${appt.tutor.firstName} ${appt.tutor.lastName}` : 'Unknown'}</td>
                  <td>{appt.subject || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
