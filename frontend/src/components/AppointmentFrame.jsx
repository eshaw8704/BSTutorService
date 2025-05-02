import React from 'react';
import './AppointmentFrame.css';
import { useNavigate, Outlet } from 'react-router-dom';

const AppointmentFrame = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/appointments/${path}`, { replace: true });
  };
  
  

  return (
    <div className="appointment-frame">
      <header className="frame-header">
        <img src="/logo.png" alt="BSTutors Logo" className="frame-logo" />
        <h2 className="frame-title">APPOINTMENTS</h2>
        <div className="frame-controls">
          <button className="frame-btn">Logout</button>
          <button className="frame-btn">⚙️</button>
          <button className="frame-btn">👤</button>
        </div>
      </header>

      <div className="frame-actions">
        <button onClick={() => handleNavigate('schedule')} className="action-button">
          📅 Schedule Appointment
        </button>
        <button onClick={() => handleNavigate('cancel')}>
          ❌ Cancel Appointment
        </button>
        <button onClick={() => handleNavigate('reschedule')}>
          🔁 Reschedule Appointment
        </button>
        <button onClick={() => handleNavigate('past')} className="action-button">
          ⬅️ Past Appointments
        </button>
        <button onClick={() => handleNavigate('dropin')} className="action-button">
          ⬇️ Drop-In Sessions
        </button>
      </div>

      <div className="frame-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppointmentFrame;
