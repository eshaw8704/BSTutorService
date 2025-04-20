import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavBar.css';

// This component represents the navigation bar for the admin dashboard
const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you might also clear authentication tokens, etc.
    navigate('/login');
  };

  // Handle navigation to different sections of the admin dashboard
  return (
    <nav className="admin-navbar">
      <button className="nav-btn" onClick={() => navigate('/admin/dashboard')}>
        Dashboard
      </button>
      <button className="nav-btn" onClick={() => navigate('/admin/appointments')}>
        Appointments
      </button>
      <button className="nav-btn" onClick={() => navigate('/admin/invoices')}>
        Invoices
      </button>
      <button className="nav-btn" onClick={() => navigate('/admin/profile')}>
        Profile
      </button>
      <button className="nav-btn" onClick={() => navigate('/admin/settings')}>
        Settings
      </button>
      <button className="nav-btn logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default AdminNavBar;
