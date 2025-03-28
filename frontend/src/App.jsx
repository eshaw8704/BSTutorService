import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentCreation from './components/StudentCreation';
import TutorCreation from './components/TutorCreation';
import AdminCreation from './components/AdminCreation';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor" element={<TutorCreation />} />
      <Route path="/admin" element={<AdminCreation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
