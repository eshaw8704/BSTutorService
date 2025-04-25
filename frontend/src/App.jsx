import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentCreation from './components/StudentCreation';
import TutorCreation from './components/TutorCreation';
import AdminCreation from './components/AdminCreation';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import StudentDashboard from './components/StudentDashboard';
import AppointmentFrame from './components/AppointmentFrame'; 

function App() {
  return (
    <>
      {/* Header on every page */}
      <Header />

      {/* All app routes */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/student" element={<StudentCreation />} />
        <Route path="/tutor" element={<TutorCreation />} />
        <Route path="/admin" element={<AdminCreation />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/appointments" element={<AppointmentFrame />} />
      </Routes>
    </>
  );
}

export default App;
