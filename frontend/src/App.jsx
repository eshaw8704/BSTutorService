import React from 'react';
import { Routes, Route } from 'react-router-dom';

import WelcomePage from './components/Frames/WelcomePage.jsx';
import StudentCreation from './components/AccountCreation/StudentCreation.jsx';
import TutorCreation from './components/AccountCreation/TutorCreation.jsx';
import AdminCreation from './components/AccountCreation/AdminCreation.jsx';
import LoginPage from './components/Frames/LoginPage.jsx';
import Header from './components/Frames/Header.jsx';

import StudentDashboard from './components/Frames/StudentDashboard.jsx';
import TutorDashboard from './components/Frames/TutorDashboard.jsx';
import AdminDashboard from './components/Frames/AdminDashboard.jsx';
import Profile from './components/Frames/Profile.jsx';

import AdminPayrollList from './components/Frames/AdminPayrollList.jsx';
import AdminPayrollReview from './components/Frames/AdminPayrollReview.jsx';
import AppointmentFrame from './components/Frames/AppointmentFrame.jsx';

// Appointment nested‑route setup
import BookAppointment from './components/BookAppointment.jsx';
import CancelAppointment from './components/CancelAppointment.jsx';
import RescheduleAppointment from './components/RescheduleAppointment.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route path="/student/profile" element={<Profile />} />
        <Route path="/tutor/profile" element={<Profile />} />
        <Route path="/student" element={<StudentCreation />} />
        <Route path="/tutor" element={<TutorCreation />} />
        <Route path="/admin" element={<AdminCreation />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/tutordashboard" element={<TutorDashboard />} />

        {/* Appointments nested routes */}
        <Route path="/appointments" element={<AppointmentFrame />}>
          <Route index element={<div>Please select an action above.</div>} />
          <Route path="schedule"   element={<BookAppointment />} />
          <Route path="cancel"     element={<CancelAppointment />} />
          <Route path="reschedule" element={<RescheduleAppointment />} />
          {/* add other nested routes like "past", "dropin" here */}
        </Route>

        {/* Admin dashboard and nested views */}
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route path="payroll" element={<AdminPayrollList />} />
          <Route path="payroll/:tutorId" element={<AdminPayrollReview />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
