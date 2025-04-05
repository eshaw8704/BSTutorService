import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/Frames/WelcomePage.jsx';
import StudentCreation from './components/AccountCreation/StudentCreation.jsx';
import TutorCreation from './components/AccountCreation/TutorCreation.jsx';
import AdminCreation from './components/AccountCreation/AdminCreation.jsx';
import LoginPage from './components/Frames/LoginPage.jsx';
import Header from './components/Frames/Header.jsx'; // green logo on every page
import StudentDashboard from './components/Frames/StudentDashboard.jsx';
import TutorDashboard from './components/Frames/TutorDashboard.jsx';


function App() {
  return (
  <>
    {/* header on every page */}
    <Header />

    {/* render your routes below it */}
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/student" element={<StudentCreation />} />
      <Route path="/tutor" element={<TutorCreation />} />
      <Route path="/admin" element={<AdminCreation />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <TutorDashboard />
    </Routes>
  </>
  );
}

export default App;
