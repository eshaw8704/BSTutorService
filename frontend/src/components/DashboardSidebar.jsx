import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardSidebar.css';

const DashboardSidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const studentLinks = [
    { label: 'Dashboard', path: '/studentdashboard' },
    { label: 'Book', path: '/appointments' },
    { label: 'Reschedule', path: '/appointments/reschedule' },
    { label: 'Cancel', path: '/appointments/cancel' },
    { label: 'Profile', path: '/student/profile' },
  ];

  const tutorLinks = [
    { label: 'Dashboard', path: '/tutordashboard' },
    { label: 'Payments', path: '/tutor/payments' },
    { label: 'Schedule', path: '/tutor/schedule' },
    { label: 'Students', path: '/tutor/students' },
    { label: 'Profile', path: '/tutor/profile' },
  ];

  const adminLinks = [
    { label: 'Dashboard', path: '/admindashboard' },
    { label: 'Appointments', path: '/admin/appointments' },
    { label: 'Invoices', path: '/admin/invoices' },
    { label: 'Profile', path: '/admin/profile' },
    { label: 'Settings', path: '/admin/settings' },
  ];

  const links =
    role === 'admin' ? adminLinks :
    role === 'tutor' ? tutorLinks :
    studentLinks;

  return (
    <nav className="admin-navbar">
      {links.map(({ label, path }) => (
        <button key={path} className="nav-btn" onClick={() => navigate(path)}>
          {label}
        </button>
      ))}
      <button className="nav-btn logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default DashboardSidebar;
