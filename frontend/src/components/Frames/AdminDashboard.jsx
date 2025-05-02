// components/Frames/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import greenLogo from '../../assets/greenBS.png';
import AdminPayrollList   from './AdminPayrollList';
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
          <button className="admin-dashboard-button" onClick={() => navigate('/admin/profile')}>Profile</button>
          <button className="admin-dashboard-button" onClick={() => navigate('/admin/settings')}>Settings</button>
          <button className="admin-dashboard-button" onClick={() => navigate('/admin/invoices')}>Invoices</button>
          <button className="admin-dashboard-button logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <aside className="sidebar">
        <div className="sidebar-heading">
          <button className="appointments-ellipse" onClick={() => navigate('/admin/appointments')}>
            Appointments
          </button>
        </div>
        <nav className="sidebar-nav">
          <h4>Welcome, Admin</h4>
          <ul>
            <li className="sidebar-link" onClick={() => setActiveView('dashboard')}>Main</li>
            <li className="sidebar-link">Users</li>
            <li className="sidebar-link" onClick={() => setActiveView('payroll')}>Payroll</li>
            <li className="sidebar-link">Schedules</li>
            <li className="nav-label">Tutors</li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main">
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
