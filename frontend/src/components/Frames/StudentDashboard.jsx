import React, { useState, useEffect } from 'react';
import DashboardLayout from "../DashboardLayout";
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
         const res = await fetch('http://localhost:5000/api/appointments/upcoming', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-stub-user-id': localStorage.getItem('userId')
          }
        });
        if (!res.ok) throw new Error('Could not load');
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
            onClick={() => navigate('/appointments')}          >
            Edit Appointments
          </button>

          <div className="appointments-box">
            <h3>Appointments</h3>
            <p className="subheading">Upcoming</p>

            {loading
              ? <p>Loading…</p>
              : error
                ? <p className="error">Error: {error}</p>
                : appointments.length === 0
                  ? <p>No upcoming appointments.</p>
                  : (
                    <ul className="appointment-list">
                      {appointments.map(appt => {
                        const dt = new Date(appt.appointmentDate);
                        const dateStr = dt.toLocaleDateString(undefined, {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric'
                        });
                        const weekday = dt.toLocaleDateString(undefined, { weekday: 'long' });
                        const timeStr = appt.appointmentTime || 'Time N/A';

                        return (
                          <li key={appt._id}>
                            📅 {dateStr} — {weekday} {timeStr}
                          </li>
                        );
                      })}
                    </ul>
                  )
            }
          </div>
        </div>

        <div className="info-box">
          <h2 className="dashboard-title">Student Dashboard</h2>
          <p className="dashboard-welcome">
            Welcome to your dashboard! <br></br>
            <br></br>Here you will acess all you need!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;