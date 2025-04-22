import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './AdminDashboard.css';
import greenLogo from '../../assets/greenBS.png';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
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
          <button onClick={() => navigate('/admindashboard/profile')}>Profile</button> {/* ✅ FIXED */}
          <button onClick={() => navigate('/admin/settings')}>Settings</button>
          <button onClick={() => navigate('/admin/invoices')}>Invoices</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <aside className="sidebar">
        <div className="sidebar-heading">
          <button
            className="appointments-ellipse"
            onClick={() => navigate('/admin/appointments')}
          >
            Appointments
          </button>
        </div>
        <nav className="sidebar-nav">
          <h4>Welcome, Admin</h4>
          <ul>
            <li>Main</li>
            <li>Users</li>
            <li className="sidebar-link" onClick={() => navigate('/admindashboard/payroll')}>
              Payroll
            </li>
            <li>Schedules</li>
            <li className="nav-label">Tutors</li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet /> {/* ✅ Used to render nested routes like Profile */}
      </main>
    </div>
  );
}
