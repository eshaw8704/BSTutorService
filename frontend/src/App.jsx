import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/Frames/WelcomePage';
import StudentCreation from './components/AccountCreation/StudentCreation';
import TutorCreation from './components/AccountCreation/TutorCreation';
import AdminCreation from './components/AccountCreation/AdminCreation';
import LoginPage from './components/Frames/LoginPage';
import Header from './components/Frames/Header'; // green logo on every page
import StudentDashboard   from './components/Frames/StudentDashboard';
import TutorDashboard     from './components/Frames/TutorDashboard';
import TutorPayrollPage   from './components/Frames/TutorPayrollPage';
import AdminPayrollList   from './components/Frames/AdminPayrollList';
import AdminPayrollReview from './components/Frames/AdminPayrollReview';
import AdminDashboard   from './components/Frames/AdminDashboard'; 

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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
