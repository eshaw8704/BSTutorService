import React, { useState, useEffect } from 'react';
import './AppointmentFrame.css';
import { useNavigate, Outlet } from 'react-router-dom';

const AppointmentFrame = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    console.debug('Fetching upcoming appointments…');
    fetch(`/api/appointments/upcoming`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    fetch('/api/appointments/upcoming', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-stub-user-id': localStorage.getItem('userId')
      }
    })    
      .then(res => {
        console.debug('Response status:', res.status);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.debug('Fetched data:', data);
        setAppointments(data);
      })
      .catch(err => console.error('Error fetching upcoming appointments:', err));
  }, [token]);

  const handleNavigate = subpath => navigate(subpath);

  return (
    <div className="appointment-frame">
      <div className="frame-actions">
        {/* …buttons… */}
      </div>

      <div className="frame-content">
        <h3>Your Upcoming Appointments</h3>
        <ul>
          {appointments.length === 0
            ? <li>No upcoming appointments</li>
            : appointments.map(a => (
                <li key={a._id}>
                  {new Date(a.appointmentDate).toLocaleDateString()} @ {a.appointmentTime}
                </li>
              ))
          }
        </ul>

        <Outlet />
      </div>
    </div>
  );
};

export default AppointmentFrame;
