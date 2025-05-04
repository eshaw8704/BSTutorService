// DashboardLayout.jsx
import React from 'react';
import Header from "./Frames/Header";
import DashboardSidebar from './DashboardSidebar';
import './DashboardLayout.css';

// purple dashboard sidebar
const DashboardLayout = ({ role, children }) => {
  return (
    <>
      <Header
        adminMode={role === 'admin'}
        tutorMode={role === 'tutor'}
      />
      <div className="dashboard-layout">
        <DashboardSidebar role={role} />
        <main className="dashboard-main-content">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;