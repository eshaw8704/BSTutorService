// src/components/DashboardLayout.jsx
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
        studentMode={role === 'student'}
      />
      <div className="dashboard-layout">
        {/* Sidebar with logout button at the bottom */}
        <DashboardSidebar role={role}>
          <button className="logout-btn">Logout</button>
        </DashboardSidebar>

        {/* Main content area */}
        <main className="dashboard-main-content">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
