import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentCreation from './components/StudentCreation';
import TutorCreation from './components/TutorCreation';
import AdminCreation from './components/AdminCreation';
import LoginPage from './components/LoginPage';
import Header from './components/Header'; // green logo on every page
import AdminDashboard from './components/AdminDashboard';

// This is the main App component that sets up the routing for the application
// It imports the necessary components and defines the routes for each page
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
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  </>
  );
}

export default App;
