import React, { useState } from 'react';              // ← pull in useState
import { useNavigate, Outlet } from 'react-router-dom';
import './AdminDashboard.css';
import DashboardLayout from "../DashboardLayout";
import greenLogo from '../../assets/greenBS.png';
import AdminPayrollList from './AdminPayrollList';
import AdminPayrollReview from './AdminPayrollReview';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeView,    setActiveView]    = React.useState('dashboard');
  const [selectedTutor, setSelectedTutor] = React.useState(null);


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
        <nav className="sidebar-nav">
          <h4>Welcome, Admin</h4>
          <ul>
            <li className="sidebar-link" onClick={() => navigate('/admindashboard')}>Main</li>
            <li className="sidebar-link" onClick={() => navigate('/admindashboard/users')}>Users</li>
            <li className="sidebar-link" onClick={() => navigate('/admindashboard/payroll')}>Payroll</li>
            <li className="sidebar-link" onClick={() => navigate('/admindashboard/schedules')}>Schedules</li>
            <li className="nav-label">Tutors</li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">

        <Outlet />

        {activeView === 'dashboard' && (
          <>
            <div className="cards-row">
              {/* … your info cards … */}
            </div>
            <div className="upcoming-sessions">
              {/* … your sessions table … */}
            </div>
          </>
        )}

        {activeView === 'payroll' && (
          <AdminPayrollList
            onSelect={(tutorId) => {
              setSelectedTutor(tutorId);
              setActiveView('review');
            }}
          />
        )}

        {activeView === 'review' && selectedTutor && (
          <AdminPayrollReview
            tutorId={selectedTutor}
            onBack={() => setActiveView('payroll')}
          />
        )}
      </main>
    </div>
  );
}