import React, { useState, useEffect } from 'react';
import './UpcomingAppointments.css';

export default function UpcomingAppointmentsFrame() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    fetch('/api/appointments/upcoming', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(setAppointments)
      .catch(err => console.error('Error loading upcoming appointments:', err));
  }, [token]);

  return (
    <div className="upcoming-appointments-frame">
      <h2>Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments found.</p>
      ) : (
        <ul>
          {appointments.map(a => (
            <li key={a._id}>
              {new Date(a.appointmentDate).toLocaleDateString()} @ {a.appointmentTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}