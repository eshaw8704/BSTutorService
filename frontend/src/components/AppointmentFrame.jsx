import React from 'react';
import './AppointmentFrame.css';
import { useNavigate } from 'react-router-dom';

const AppointmentFrame = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
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
        <button onClick={() => handleNavigate('/appointments/schedule')} className="action-button">
          📅 Schedule Appointment
        </button>
        <button onClick={() => handleNavigate('/appointments/cancel')} className="action-button">
          ❌ Cancel Appointment
        </button>
        <button onClick={() => handleNavigate('/appointments/reschedule')} className="action-button">
          📅 Reschedule Appointment
        </button>
        <button onClick={() => handleNavigate('/past')} className="action-button">
          ⬅️ Past Appointments
        </button>
        <button onClick={() => handleNavigate('/dropin')} className="action-button">
          ⬇️ Drop-In Sessions
        </button>
      </div>
    </div>
  );
};

export default AppointmentFrame;
