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
import TutorPayrollPage from './components/Frames/TutorPayrollPage.jsx';
import AdminPayrollList from './components/Frames/AdminPayrollList.jsx';
import AdminPayrollReview from './components/Frames/AdminPayrollReview.jsx';



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
