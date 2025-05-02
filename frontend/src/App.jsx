// src/App.jsx
import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

// — Public screens
import WelcomePage     from './components/Frames/WelcomePage';
import LoginPage       from './components/Frames/LoginPage';
import StudentCreation from './components/AccountCreation/StudentCreation';
import TutorCreation   from './components/AccountCreation/TutorCreation';
import AdminCreation   from './components/AccountCreation/AdminCreation';

// — DashboardLayout + Admin pages
import DashboardLayout    from './components/DashboardLayout';
import AdminDashboardHome from './components/Frames/AdminDashboard';
import AdminUsers         from './components/Frames/AdminUsers';
import AdminPayrollList   from './components/Frames/AdminPayrollList';
import AdminAppointments  from './components/Frames/AdminAppointments';

// — Shared (Tutor/Student dashboards & misc)
import StudentDashboard from './components/Frames/StudentDashboard';
import TutorDashboard   from './components/Frames/TutorDashboard';
import Profile          from './components/Frames/Profile';
import Settings         from './components/Frames/Settings';

// — AppointmentFrame (nested under /appointments)
import AppointmentFrame from './components/Frames/AppointmentFrame';

export default function App() {
  return (
    <Routes>
      {/* legacy redirect */}
      <Route
        path="/admindashboard"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      {/* Public */}
      <Route path="/"      element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor"   element={<TutorCreation />} />
      <Route path="/admin"   element={<AdminCreation />} />

      {/* Student/Tutor Dashboards */}
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/tutordashboard"   element={<TutorDashboard />} />

      {/* Stand-alone Appointments */}
      <Route path="/appointments/*" element={<AppointmentFrame />}>
        <Route index             element={<Navigate to="schedule" replace />} />
        <Route path="schedule"   element={<AppointmentFrame.Schedule />} />
        <Route path="reschedule" element={<AppointmentFrame.Reschedule />} />
        <Route path="cancel"     element={<AppointmentFrame.Cancel />} />
      </Route>

      {/* —— ALL ADMIN ROUTES —— */}
      <Route
        path="/admin/*"
        element={
          <DashboardLayout role="admin">
            <Outlet />
          </DashboardLayout>
        }
      >
        {/* /admin → /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard"    element={<AdminDashboardHome />} />
        <Route path="profile"  element={<Profile />} />
        <Route path="users"        element={<AdminUsers />} />
        <Route path="invoices"     element={<AdminPayrollList />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="settings"     element={<Settings />} />
      </Route>

      {/* Fallback to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
