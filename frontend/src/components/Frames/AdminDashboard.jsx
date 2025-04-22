import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from "../DashboardLayout";
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="admin-main">
        <Outlet />
      </div>
    </DashboardLayout>
  );
}
