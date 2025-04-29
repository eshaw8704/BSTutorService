import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import greenLogo from '../../assets/greenBS.png';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-layout">
      <header className="admin-header">
        <div className="header-left">
          <img src={greenLogo} alt="BSTutors" className="header-logo" />
          <h1>BSTutors</h1>
        </div>
        <div className="header-admin-buttons">
          <button className="admin-dashboard-button" onClick={() => navigate('/admindashboard/profile')}>Profile</button>
          <button className="admin-dashboard-button" onClick={() => navigate('/admindashboard/payroll')}>Payroll</button>
          <button className="admin-dashboard-button" onClick={() => navigate('/admindashboard/schedules')}>Schedules</button>
          <button className="admin-dashboard-button logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <aside className="sidebar">
        <div className="sidebar-heading">
          
        </div>
        <nav className="sidebar-nav">
          <h4>Welcome, Admin</h4>
          <ul>
            <li className="sidebar-link" onClick={() => navigate('/admindashboard')}>Main</li>
            <li className="sidebar-link">Users</li>
            <li className="sidebar-link" onClick={() => navigate('/admindashboard/payroll')}>Payroll</li>
            <li className="sidebar-link" onClick={() => navigate('/admindashboard/schedules')}>Schedules </li>
            <li className="nav-label">Tutors</li>
          </ul>
        </nav>
      </aside>

      {/* 🔥 THIS IS WHERE NESTED ROUTES WILL RENDER */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
