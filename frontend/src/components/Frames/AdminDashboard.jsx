import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import greenLogo from '../../assets/greenBS.png'; // Adjust path if needed

// This component represents the admin dashboard layout
export default function AdminDashboard() {
  const navigate = useNavigate();

  // Handle logout function
  const handleLogout = () => {
    // Add your logout logic here if needed
    navigate('/login');
  };

  return (
    // This is the main layout for the admin dashboard
    <div className="admin-dashboard-layout">
      {/* Fixed Header */}
      <header className="admin-header">
        <div className="header-left">
          <img src={greenLogo} alt="BSTutors" className="header-logo" />
          <h1>BSTutors</h1>
        </div>
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
            Appointments
          </button>
        </div>
        <nav className="sidebar-nav">
          <h4>Welcome, Admin</h4>
          <ul>
            <li>Main</li>
            <li>Users</li>
            <li>Payments</li>
            <li>Schedules</li>
            <li className="nav-label">Tutors</li>
          </ul>
        </nav>
      </aside>

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
      </main>
    </div>
  );
}
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
