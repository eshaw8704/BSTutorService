import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import DashboardLayout from "../DashboardLayout";
import greenLogo from '../../assets/greenBS.png';
import AdminPayrollList from './AdminPayrollList';

// This component represents the admin dashboard layout
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = React.useState('dashboard');

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
              <div className="info-card">
                <h4>Number of Students</h4>
                <p>1001</p>
              </div>
              <div className="info-card">
                <h4>Number of Tutors</h4>
                <p>21</p>
              </div>
              <div className="info-card">
                <h4>Upcoming Sessions</h4>
                <p>Today</p>
              </div>
            </div>

            <div className="upcoming-sessions">
              <h3>Upcoming Sessions:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Student Name</th>
                    <th>Tutor Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10:00 AM - 12:00 PM</td>
                    <td>Farrukh Smith</td>
                    <td>Lizette Hernandez</td>
                  </tr>
                  <tr>
                    <td>11:00 AM - 2:00 PM</td>
                    <td>Rumeet Nolan</td>
                    <td>Mary Shoe</td>
                  </tr>
                  <tr>
                    <td>1:00 PM - 3:00 PM</td>
                    <td>Matthew Playa</td>
                    <td>Papi Man</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeView === 'payroll' && <AdminPayrollList />}
      </main>
    </div>
  );
}
