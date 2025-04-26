import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
<<<<<<< HEAD
import DashboardLayout from "../DashboardLayout";
import greenLogo from '../../assets/greenBS.png';
=======
import greenLogo from '../../assets/greenBS.png';
import AdminPayrollList from './AdminPayrollList';
>>>>>>> efa0e972d380f6de14480bd18fb63a034fc7b2a4

// This component represents the admin dashboard layout
export default function AdminDashboard() {
  const navigate = useNavigate();
<<<<<<< HEAD

  // Handle logout function
  const handleLogout = () => {
    // Add your logout logic here if needed
=======
  const [activeView, setActiveView] = React.useState('dashboard');

  const handleLogout = () => {
    localStorage.clear();
>>>>>>> efa0e972d380f6de14480bd18fb63a034fc7b2a4
    navigate('/login');
  };

  return (
<<<<<<< HEAD
    // This is the main layout for the admin dashboard
    <div className="admin-dashboard-layout">
      {/* Fixed Header */}
=======
    <div className="admin-dashboard-layout">
>>>>>>> efa0e972d380f6de14480bd18fb63a034fc7b2a4
      <header className="admin-header">
        <div className="header-left">
          <img src={greenLogo} alt="BSTutors" className="header-logo" />
          <h1>BSTutors</h1>
        </div>
<<<<<<< HEAD
          {/* Admin Buttons SHIFTED to the left side, next to the logo/title */}
          <div className="header-admin-buttons">
            <button onClick={() => navigate('/admin/profile')}>Profile</button>
            <button onClick={() => navigate('/admin/settings')}>Settings</button>
            <button onClick={() => navigate('/admin/invoices')}>Invoices</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
      </header>

      {/* Sidebar on the left */}
      <aside className="sidebar">
        <div className="sidebar-heading">
          {/* Turn the purple ellipse into a clickable button labeled "Appointments" */}
          <button
            className="appointments-ellipse"
            onClick={() => navigate('/admin/appointments')}
          >
=======
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
>>>>>>> efa0e972d380f6de14480bd18fb63a034fc7b2a4
            Appointments
          </button>
        </div>
        <nav className="sidebar-nav">
          <h4>Welcome, Admin</h4>
          <ul>
<<<<<<< HEAD
            <li>Main</li>
            <li>Users</li>
            <li>Payments</li>
            <li>Schedules</li>
=======
            <li className="sidebar-link" onClick={() => setActiveView('dashboard')}>Main</li>
            <li className="sidebar-link">Users</li>
            <li className="sidebar-link" onClick={() => setActiveView('payroll')}>Payroll</li>
            <li className="sidebar-link">Schedules</li>
>>>>>>> efa0e972d380f6de14480bd18fb63a034fc7b2a4
            <li className="nav-label">Tutors</li>
          </ul>
        </nav>
      </aside>

<<<<<<< HEAD
      {/* Main Content */}
      <main className="admin-main">
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
=======
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
>>>>>>> efa0e972d380f6de14480bd18fb63a034fc7b2a4
      </main>
    </div>
  );
}
