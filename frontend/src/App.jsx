// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

// — Public
import WelcomePage           from './components/Frames/WelcomePage';
import LoginPage             from './components/Frames/LoginPage';
import StudentCreation       from './components/AccountCreation/StudentCreation';
import TutorCreation         from './components/AccountCreation/TutorCreation';
import AdminCreation         from './components/AccountCreation/AdminCreation';

// — Layouts
import DashboardLayout       from './components/DashboardLayout';

// — Admin Pages
import AdminDashboardHome    from './components/Frames/AdminDashboard';
import AdminUsers            from './components/Frames/AdminUsers';
import AdminPayrollList      from './components/Frames/AdminPayrollList';
import AdminAppointments     from './components/Frames/AdminAppointments';
import AdminPayrollReview    from './components/Frames/AdminPayrollReview';
import AdminTrafficDashboard from './components/Frames/AdminTrafficDashboard';

// — Tutor/Student Pages
import StudentDashboard      from './components/Frames/StudentDashboard';
import TutorDashboard        from './components/Frames/TutorDashboard';
import Profile               from './components/Frames/Profile';
import Settings              from './components/Frames/Settings';

// — Appointments
import AppointmentFrame      from './components/Frames/AppointmentFrame';
import BookAppointment       from './components/BookAppointment';
import RescheduleAppointment from './components/RescheduleAppointment';
import CancelAppointment     from './components/CancelAppointment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

      {/* Public Routes */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor" element={<TutorCreation />} />
      <Route path="/admin-create" element={<AdminCreation />} /> {/* ✅ FIXED */}
      <Route path="/traffic" element={<AdminTrafficDashboard />} />
        {/* Legacy Redirect */}
        <Route path="/admindashboard" element={<Navigate to="/admin/dashboard" replace />} />
      {/* Public Routes */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor" element={<TutorCreation />} />
      <Route path="/admin-create" element={<AdminCreation />} /> {/* ✅ FIXED */}
      <Route path="/traffic" element={<AdminTrafficDashboard />} />

        {/* Student Dashboard */}
        <Route
          path="/studentdashboard/*"
          element={
            <DashboardLayout role="student">
              <Outlet />
            </DashboardLayout>
          }
        >
          <Route index   element={<StudentDashboard />} />
          <Route path="profile"  element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Tutor Dashboard */}
        <Route
          path="/tutordashboard/*"
          element={
            <DashboardLayout role="tutor">
              <Outlet />
            </DashboardLayout>
          }
        >
          <Route index   element={<TutorDashboard />} />
          <Route path="profile"  element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>


      {/* Appointments/sidebar added to student */}
      <Route
        path="/appointments/*"
        element={
          <DashboardLayout role="student">
            <AppointmentFrame />
          </DashboardLayout>
        }
      >
        <Route index element={<Navigate to="schedule" replace />} />
        <Route path="schedule" element={<BookAppointment />} />
        <Route path="reschedule" element={<RescheduleAppointment />} />
        <Route path="cancel" element={<CancelAppointment />} />
      </Route>


        {/* Admin Area */}
        <Route
          path="/admin/*"
          element={
            <DashboardLayout role="admin">
              <Outlet />
            </DashboardLayout>
          }
        >
          <Route index            element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardHome />} />
          <Route path="users"     element={<AdminUsers />} />
          <Route path="traffic"   element={<AdminTrafficDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="invoices/*" element={<Outlet />}>
            <Route index           element={<AdminPayrollList />} />
            <Route path=":tutorId" element={<AdminPayrollReview />} />
          </Route>
          <Route path="profile"   element={<Profile />} />
          <Route path="settings"  element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}