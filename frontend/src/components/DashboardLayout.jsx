import React from 'react';
import Header from "./Frames/Header";
import DashboardSidebar from './DashboardSidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ role, children }) => {
  return (
    <>
      <Header />
      <div className="dashboard-layout">
        <DashboardSidebar role={role} />
        <div className="dashboard-main-content">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
