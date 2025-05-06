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
    { label: 'Profile', path: '/tutor/profile' },
  ];

  const adminLinks = [
    { label: 'Dashboard', path: '/admindashboard' },
    { label: 'Appointments', path: '/admin/appointments' },
    { label: 'Invoices', path: '/admin/invoices' },
    { label: 'Profile', path: '/admin/profile' },
    { label: 'Settings', path: '/admin/settings' },
  ];

  const linksByRole = {
    admin: [
      { label: 'Main',         path: '/admin/dashboard' },
      { label: 'Users',        path: '/admin/users' },
      { label: 'Payroll',      path: '/admin/invoices' },
      { label: 'Appointments', path: '/admin/appointments' },
    ],
    tutor: [
      { label: 'Dashboard', path: '/tutordashboard' },
      { label: 'Payroll',   path: '/tutor/payroll'    },
      { label: 'Profile',   path: '/tutor/profile'    },
    ],
    student: [
      { label: 'Dashboard',   path: '/studentdashboard'       },
      { label: 'Book',        path: '/appointments/schedule'  },
      { label: 'Reschedule',  path: '/appointments/reschedule'},
      { label: 'Cancel',      path: '/appointments/cancel'    },
      { label: 'Profile',     path: '/student/profile'        },
    ],
  };

  const links = linksByRole[role] || [];

  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-heading">
        Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}
      </h2>
      <nav className="sidebar-nav">
        {links.map(({ label, path }) => (
          <button
            key={path}
            className="sidebar-btn"
            onClick={() => navigate(path)}
          >
            {label}
          </button>
        ))}
      </nav>
      <button className="sidebar-btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
