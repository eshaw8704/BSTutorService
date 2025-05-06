import React, { useState, useEffect } from 'react';
import './AppointmentFrame.css';
import { useNavigate, Outlet } from 'react-router-dom';
import UpcomingAppointmentsFrame from '../UpcomingAppointments';
import CancelAppointment from '../CancelAppointment';
import RescheduleAppointment from '../RescheduleAppointment';
import BookAppointment  from '../BookAppointment';
//import DropInAppointment from '../DropInAppointment';


const AppointmentFrame = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const studentID = localStorage.getItem('userId');
  const token     = localStorage.getItem('token');

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
    navigate(`/appointments/${subpath}`);
  };  

  return (
    <div className="appointment-frame">
      <div className="frame-actions">
        <button onClick={() => handleNavigate('schedule')}   className="action-button">📅 Schedule</button>
        <button onClick={() => handleNavigate('cancel')}     className="action-button">❌ Cancel</button>
        <button onClick={() => handleNavigate('reschedule')} className="action-button">⏰ Reschedule</button>
    </div>
    
    <div className="back-button-container">
        <button onClick={() => navigate('/studentdashboard')} className="back-button">⬅️ Back to Dashboard</button>
    </div>


      <div className="frame-content">
        <UpcomingAppointmentsFrame />
        <ul>
        </ul>
        {/* And now render whichever nested route the user clicked */}
        <Outlet />
      </div>
    </div>
  );
};

export default AppointmentFrame;
