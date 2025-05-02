import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

// — Public
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
import AdminPayrollReview from './components/Frames/AdminPayrollReview';

// — Tutor/Student dashboards & shared
import StudentDashboard from './components/Frames/StudentDashboard';
import TutorDashboard   from './components/Frames/TutorDashboard';
import Profile          from './components/Frames/Profile';
import Settings         from './components/Frames/Settings';

// — AppointmentFrame (nested under /appointments)
import AppointmentFrame from './components/Frames/AppointmentFrame';

export default function App() {
  return (
    <Routes>
     {/* Public routes without Header */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor" element={<TutorCreation />} />
      <Route path="/admin" element={<AdminCreation />} />
     
      {/* Legacy redirect */}
      {/* Dashboard-related routes with Header */}
      <Route path="/studentdashboard" element={<DashboardLayout role="student"><StudentDashboard /></DashboardLayout>} />
      <Route path="/tutordashboard" element={<DashboardLayout role="tutor"><TutorDashboard /></DashboardLayout>} />
      <Route path="/admindashboard" element={<DashboardLayout role="admin"><AdminDashboardHome /></DashboardLayout>} />

      {/* Public */}
      <Route path="/"       element={<WelcomePage />} />
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor"   element={<TutorCreation />} />
      <Route path="/admin"   element={<AdminCreation />} />

      {/* Student/Tutor Dashboards */}
      <Route path="/studentdashboard" element={<StudentDashboard />}>
        <Route path="profile" element={<Profile />} />       {/* Add Profile route */}
        <Route path="settings" element={<Settings />} />     {/* Add Settings route */}
      </Route>
      <Route path="/tutordashboard" element={<TutorDashboard />}>
        <Route path="profile" element={<Profile />} />       {/* Add Profile route */}
        <Route path="settings" element={<Settings />} />     {/* Add Settings route */}
      </Route>

      {/* Stand-alone Appointments */}
      <Route path="/appointments/*" element={<AppointmentFrame />}>
        <Route index             element={<Navigate to="schedule" replace />} />
        <Route path="schedule"   element={<AppointmentFrame.Schedule />} />
        <Route path="reschedule" element={<AppointmentFrame.Reschedule />} />
        <Route path="cancel"     element={<AppointmentFrame.Cancel />} />
      </Route>

      {/* —— ADMIN AREA —— */}
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
        <Route path="users"        element={<AdminUsers />} />
        <Route path="invoices/*"   element={<Outlet />}>
          <Route index      element={<AdminPayrollList />} />
          <Route path=":tutorId" element={<AdminPayrollReview />} />
        </Route>
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="profile"      element={<Profile />} />
        <Route path="settings"     element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
