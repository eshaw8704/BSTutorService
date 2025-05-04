import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

// — Public
import WelcomePage from './components/Frames/WelcomePage';
import LoginPage from './components/Frames/LoginPage';
import StudentCreation from './components/AccountCreation/StudentCreation';
import TutorCreation from './components/AccountCreation/TutorCreation';
import AdminCreation from './components/AccountCreation/AdminCreation';

// — DashboardLayout + Admin pages
import DashboardLayout from './components/DashboardLayout';
import AdminDashboardHome from './components/Frames/AdminDashboard';
import AdminUsers from './components/Frames/AdminUsers';
import AdminPayrollList from './components/Frames/AdminPayrollList';
import AdminAppointments from './components/Frames/AdminAppointments';
import AdminPayrollReview from './components/Frames/AdminPayrollReview';

// — Tutor/Student dashboards & shared
import StudentDashboard from './components/Frames/StudentDashboard';
import TutorDashboard from './components/Frames/TutorDashboard';
import Profile from './components/Frames/Profile';
import Settings from './components/Frames/Settings';

// — AppointmentFrame and nested appointment routes
import AppointmentFrame from './components/Frames/AppointmentFrame';
import BookAppointment from './components/BookAppointment';
import RescheduleAppointment from './components/RescheduleAppointment';
import CancelAppointment from './components/CancelAppointment';

// — Optional: Admin traffic stats (if used)
import AdminTrafficDashboard from './components/Frames/AdminTrafficDashboard';

export default function App() {
  return (
    <Routes>
      {/* Legacy Redirect */}
      <Route path="/admindashboard" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Public Routes */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor" element={<TutorCreation />} />
      <Route path="/admin" element={<AdminCreation />} />
      <Route path="/traffic" element={<AdminTrafficDashboard />} />

      {/* Student & Tutor Dashboards */}
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/tutordashboard" element={<TutorDashboard />} />

      {/* Appointments (Nested) */}
      <Route path="/appointments/*" element={<AppointmentFrame />}>
        <Route index element={<Navigate to="schedule" replace />} />
        <Route path="schedule" element={<BookAppointment />} />
        <Route path="reschedule" element={<RescheduleAppointment />} />
        <Route path="cancel" element={<CancelAppointment />} />
      </Route>

      {/* Admin Area with Layout */}
      <Route path="/admin/*" element={<DashboardLayout role="admin"><Outlet /></DashboardLayout>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardHome />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="invoices/*" element={<Outlet />}>
          <Route index element={<AdminPayrollList />} />
          <Route path=":tutorId" element={<AdminPayrollReview />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
