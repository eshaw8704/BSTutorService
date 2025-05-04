import React, { useState, useEffect } from 'react';
import './AppointmentFrame.css';
import { useNavigate, Outlet } from 'react-router-dom';

const AppointmentFrame = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const studentID = localStorage.getItem('userId');
  const token     = localStorage.getItem('token');
  const user      = localStorage.getItem('user');
  const role      = user ? JSON.parse(user).role : null;

  // Load existing appointments for this student
  useEffect(() => {
    if (!studentID) return;
    fetch(`/api/appointments/${studentID}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(setAppointments)
      .catch(err => console.error('Error fetching appointments:', err));
  }, [studentID, token]);

  const handleNavigate = (subpath) => {
    navigate(subpath);
  };

  return (
    <div className="appointment-frame">
      {/* only show this pink sidebar for students */}
      {role === 'student' && (
        <div className="frame-actions">
        <button onClick={() => handleNavigate('schedule')}   className="action-button">📅 Schedule</button>
        <button onClick={() => handleNavigate('cancel')}     className="action-button">❌ Cancel</button>
        <button onClick={() => handleNavigate('reschedule')} className="action-button">⏰ Reschedule</button>
        <button onClick={() => navigate('past')}   className="action-button">⬅️ Past</button>
        <button onClick={() => navigate('dropin')} className="action-button">⬇️ Drop-In</button>
        {/* nested content (schedule, cancel, etc) */}
        <Outlet />
        </div>
      )}

      <div className="frame-content">
        {/* Example: show a quick list of today’s bookings */}
        <h3>Your Appointments</h3>
        <ul>
          {appointments.map(a => (
            <li key={a._id}>
              {new Date(a.appointmentDate).toLocaleDateString()} @ {a.appointmentTime}
            </li>
          ))}
        </ul>

        {/* And now render whichever nested route the user clicked */}
        <Outlet />
      </div>
    </div>
  );
};

export default AppointmentFrame;
