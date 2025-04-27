import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header                 from './components/Frames/Header.jsx';
import WelcomePage            from './components/Frames/WelcomePage.jsx';
import LoginPage              from './components/Frames/LoginPage.jsx';
import StudentCreation        from './components/AccountCreation/StudentCreation.jsx';
import TutorCreation          from './components/AccountCreation/TutorCreation.jsx';
import AdminCreation          from './components/AccountCreation/AdminCreation.jsx';

import StudentDashboard       from './components/Frames/StudentDashboard.jsx';
import TutorDashboard         from './components/Frames/TutorDashboard.jsx';
import AdminDashboard         from './components/Frames/AdminDashboard.jsx';
import Profile                from './components/Frames/Profile.jsx';

import AppointmentFrame       from './components/Frames/AppointmentFrame.jsx';
import BookAppointment        from './components/BookAppointment.jsx';
import CancelAppointment      from './components/CancelAppointment.jsx';
import RescheduleAppointment  from './components/RescheduleAppointment.jsx';

import AdminPayrollList       from './components/Frames/AdminPayrollList.jsx';
import AdminPayrollReview     from './components/Frames/AdminPayrollReview.jsx';

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Public & Auth */}
        <Route path="/"            element={<WelcomePage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/student"     element={<StudentCreation />} />
        <Route path="/tutor"       element={<TutorCreation />} />
        <Route path="/admin"       element={<AdminCreation />} />

        {/* Dashboards */}
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/tutordashboard"   element={<TutorDashboard />} />
        <Route path="/admindashboard"   element={<AdminDashboard />} />

        {/* Profile */}
        <Route path="/student/profile"  element={<Profile />} />
        <Route path="/tutor/profile"    element={<Profile />} />
        <Route path="/admin/profile"    element={<Profile />} />

        {/* Appointments */}
        <Route path="/appointments/*"   element={<AppointmentFrame />}>
          <Route index                element={<div>Select an action.</div>} />
          <Route path="schedule"     element={<BookAppointment />} />
          <Route path="cancel"       element={<CancelAppointment />} />
          <Route path="reschedule"   element={<RescheduleAppointment />} />
        </Route>

        {/* Top-level payroll routes */}
        <Route path="/adminpayroll"           element={<AdminPayrollList />} />
        <Route path="/adminpayroll/:tutorId"  element={<AdminPayrollReview />} />
      </Routes>
    </>
  );
}
