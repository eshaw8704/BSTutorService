import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentCreation from './components/StudentCreation';
import TutorCreation from './components/TutorCreation';
import AdminCreation from './components/AdminCreation';
import LoginPage from './components/LoginPage';
import Header from './components/Header'; // green logo on every page

// This is the main App component that sets up the routing for the application
// It imports the necessary components and defines the routes for each page
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/student" element={<StudentCreation />} />
        <Route path="/tutor" element={<TutorCreation />} />
        <Route path="/admin" element={<AdminCreation />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/tutordashboard" element={<TutorDashboard />} />
        <Route path="/tutorpayroll" element={<TutorPayrollPage />} />
        <Route path="/adminpayroll" element={<AdminPayrollList />} />
        <Route path="/adminpayroll/:tutorId" element={<AdminPayrollReview />} />
      </Routes>
    </>
  );
}

export default App;
