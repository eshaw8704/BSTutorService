import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  const goToStudentCreation = () => {
    navigate('/student');
  };

  const goToTutorCreation = () => {
    navigate('/tutor');
  };

  const goToAdminCreation = () => {
    navigate('/admin');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-page">
      <h1 className="title">BSTutors</h1>
      <p className="subtitle">Study Smarter, Not Harder<br />- With Expert Tutors</p>
      <div className="button-group">
        <button className="welcome-button" onClick={goToStudentCreation}>Create Student Account</button>
        <button className="welcome-button" onClick={goToTutorCreation}>Create Tutor Account</button>
        <button className="welcome-button" onClick={goToAdminCreation}>Create Admin Account</button>
        <button className="welcome-button" onClick={goToLogin}>Login</button>
      </div>
    </div>
  );
}

export default WelcomePage;
