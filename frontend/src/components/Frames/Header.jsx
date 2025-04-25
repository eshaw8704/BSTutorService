import React from 'react';
import { useNavigate } from 'react-router-dom';
import greenLogo from '../../assets/greenBS.png';
import "./Header.css";

// This component represents the header for the admin dashboard
// It includes the BSTutors logo and admin navigation buttons
export default function Header({ adminMode, tutorMode }) {
  const navigate = useNavigate();
  
  // Handle logout function
  const handleLogout = () => {
    navigate('/login');
  };

  // Only render this button‐group if either flag is true
  const showButtons = adminMode || tutorMode;

  return (
    // Header layout with BSTutors logo and admin buttons
    <header className="admin-header">
      <div className="header-left">
        <img src={greenLogo} alt="BSTutors Logo" className="header-logo" />
        <h1>BSTutors</h1>
      </div>
      
      {showButtons && (
      <div className="header-admin-buttons">
          {adminMode ? (
            // Admin links
            <>
              <button onClick={() => navigate('/admin/profile')}>Profile</button>
              <button onClick={() => navigate('/admin/settings')}>Settings</button>
              <button onClick={() => navigate('/admin/invoices')}>Invoices</button>
            </>
          ) : (
            // Tutor links
            <>
              <button onClick={() => navigate('/tutor/profile')}>Profile</button>
              <button onClick={() => navigate('/tutor/settings')}>Settings</button>
              <button onClick={() => navigate('/tutor/payroll')}>Payroll</button>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
          </div>

          )}
    </header>
  );
}
