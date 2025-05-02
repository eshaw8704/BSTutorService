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

// — AppointmentFrame (wrapper for nested routes)
import AppointmentFrame       from './components/Frames/AppointmentFrame';
// — Individual appointment views
import BookAppointment        from './components/BookAppointment';
import RescheduleAppointment  from './components/RescheduleAppointment';
import CancelAppointment      from './components/CancelAppointment';

export default function App() {
  return (
    <Routes>
      {/* Legacy redirect */}
      <Route path="/admindashboard" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Public */}
      <Route path="/"       element={<WelcomePage />} />
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor"   element={<TutorCreation />} />
      <Route path="/admin"   element={<AdminCreation />} />

      {/* Student/Tutor Dashboards */}
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/tutordashboard"   element={<TutorDashboard />} />

      {/* Stand-alone Appointments */}
      <Route path="/appointments/*" element={<AppointmentFrame />}>
        <Route index element={<Navigate to="schedule" replace />} />
        <Route path="schedule"   element={<BookAppointment />} />
        <Route path="reschedule" element={<RescheduleAppointment />} />
        <Route path="cancel"     element={<CancelAppointment />} />
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

        <Route path="dashboard"  element={<AdminDashboardHome />} />
        <Route path="users"      element={<AdminUsers />} />
        <Route path="invoices/*" element={<Outlet />}>
          <Route index         element={<AdminPayrollList />} />
          <Route path=":tutorId" element={<AdminPayrollReview />} />
        </Route>
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="profile"      element={<Profile />} />
        <Route path="settings"     element={<Settings />} />
      </Route>
/*import AppointmentFrame       from './components/Frames/AppointmentFrame.jsx';
import BookAppointment        from './components/BookAppointment.jsx';
import CancelAppointment      from './components/CancelAppointment.jsx';
import RescheduleAppointment  from './components/RescheduleAppointment.jsx';
//import DropInAppointments     from './components/Styles/DropInAppointments.jsx';

import AdminPayrollList       from './components/Frames/AdminPayrollList.jsx';
import AdminPayrollReview     from './components/Frames/AdminPayrollReview.jsx';
import AdminTrafficDashboard from './components/Frames/AdminTrafficDashboard.jsx';

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Public & Auth */}
        /*<Route path="/"            element={<WelcomePage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/student"     element={<StudentCreation />} />
        <Route path="/tutor"       element={<TutorCreation />} />
        <Route path="/admin"       element={<AdminCreation />} />
        <Route path="traffic" element={<AdminTrafficDashboard />} />

        {/* Dashboards */}
       /* <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/tutordashboard"   element={<TutorDashboard />} />
        <Route path="/admindashboard"   element={<AdminDashboard />} />

        {/* Profile */}
       /* <Route path="/student/profile"  element={<Profile />} />
        <Route path="/tutor/profile"    element={<Profile />} />
        <Route path="/admin/profile"    element={<Profile />} />

        {/* Appointments */}
       /* <Route path="/appointments" element={<AppointmentFrame />}>
        <Route path="schedule" element={<BookAppointment />} />
        <Route path="cancel" element={<CancelAppointment />} />
        <Route path="reschedule" element={<RescheduleAppointment />} />
        <Route index element={<div>Please select an action above.</div>} />
      </Route>*/
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}