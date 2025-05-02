import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import greenLogo from '../../assets/greenBS.png';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const dummyMeetings = [
    { id: 1, title: 'Calculus Tutoring',   tutor: 'Alice Wong',   date: '2025-05-05', time: '10:00 AM' },
    { id: 2, title: 'Physics Review',      tutor: 'Bob Lee',      date: '2025-05-06', time: '2:00 PM'   },
    { id: 3, title: 'Chemistry Lab Prep',  tutor: 'Carmen Patel', date: '2025-05-07', time: '11:30 AM' },
  ];

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
        {/* 🔔 Welcome banner */}
        {showBanner && (
          <div className="welcome-banner">
            <span>👋 Welcome back, Admin!</span>
            <button
              className="banner-close"
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss banner"
            >
              ×
            </button>
          </div>
        )}

        {/* nested route content */}
        <Outlet />

        {/* Dummy Meetings List */}
        <section className="meetings-list">
          <h2>Upcoming Meetings</h2>
          <table className="schedules-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Tutor</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {dummyMeetings.map(m => (
                <tr key={m.id}>
                  <td>{m.title}</td>
                  <td>{m.tutor}</td>
                  <td>{m.date}</td>
                  <td>{m.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}