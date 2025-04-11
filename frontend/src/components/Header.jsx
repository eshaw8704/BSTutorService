import React from 'react';
import { useNavigate } from 'react-router-dom';
import greenLogo from '../assets/greenBS.png';
import "./Header.css";

// This component represents the header for the admin dashboard
// It includes the BSTutors logo and admin navigation buttons
export default function Header({ adminMode }) {
  const navigate = useNavigate();
  
  // Handle logout function
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    // Header layout with BSTutors logo and admin buttons
    <header className="admin-header">
      <div className="header-left">
        <img src={greenLogo} alt="BSTutors Logo" className="header-logo" />
        <h1>BSTutors</h1>
      </div>
      {adminMode && (
        <div className="header-admin-buttons">
          <button onClick={() => navigate('/admin/profile')}>Profile</button>
          <button onClick={() => navigate('/admin/settings')}>Settings</button>
          <button onClick={() => navigate('/admin/invoices')}>Invoices</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}
