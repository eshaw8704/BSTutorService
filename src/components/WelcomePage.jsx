import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  const goToStudentCreation = () => {
    navigate('/student');
  };

  return (
    <div className="welcome-page">
      <h1 className="title">BSTutors</h1>
      <p className="subtitle">Study Smarter, Not Harder<br />- With Expert Tutors</p>
      <div className="button-group">
        <button className="welcome-button" onClick={goToStudentCreation}>Create Student Account</button>
      </div>
    </div>
  );
}

export default WelcomePage;
