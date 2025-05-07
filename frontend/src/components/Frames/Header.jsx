// src/components/Frames/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import greenLogo from '../../assets/greenBS.png';
import "./Header.css";

export default function Header({ adminMode, tutorMode }) {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');
  const showButtons = adminMode || tutorMode;

  return (
    <header className="admin-header">
      <div
        className="header-left"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        <img src={greenLogo} alt="BSTutors Logo" className="header-logo" />
        <h1>BSTutors</h1>
      </div>

      {showButtons && (
        <div className="header-admin-buttons">
          {adminMode ? (
            <>
              <button onClick={() => navigate('/admin/profile')}>
                Profile
              </button>
              <button onClick={() => navigate('/admin/settings')}>
                Settings
              </button>
              {/* Invoices button removed */}
            </>
          ) : (
            <>
              <button onClick={() => navigate('/tutor/profile')}>
                Profile
              </button>
              <button onClick={() => navigate('/tutor/settings')}>
                Settings
              </button>
              <button onClick={() => navigate('/tutor/payroll')}>
                Payroll
              </button>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}
