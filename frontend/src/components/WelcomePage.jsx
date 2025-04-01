import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import yellowLogo from "../assets/yellowBS.png"; // import logo

function WelcomePage() {
  const navigate = useNavigate();

  // handlers for nagivation
  const goToStudentCreation = () => navigate('/student');
  const goToTutorCreation = () => navigate('/tutor');
  const goToAdminCreation = () => navigate('/admin');
  const goToLogin = () => navigate('/login');

  return (
    <div className="welcome-page">
    {/* left side: Title, Subtitle, Buttons */}
    <div className="left-content">
      <p className="subtitle">
        Study Smarter, <br /> Not Harder
        <br />
        - With Expert Tutors
      </p>

      <div className="button-group">
        <button className="welcome-button" onClick={goToStudentCreation}>
          Create Student Account
        </button>
        <button className="welcome-button" onClick={goToTutorCreation}>
          Create Tutor Account
        </button>
        <button className="welcome-button" onClick={goToAdminCreation}>
          Create Admin Account
        </button>
        <button className="welcome-button" onClick={goToLogin}>
          Login
        </button>
      </div>
    </div>

      {/* right side: display the yellowBS */}
      <div className = "right-content">
        <img 
          src={yellowLogo} 
          alt="BSTutors Yellow Logo" 
          className="yellow-logo" 
        />

      </div>
    </div>
  );
}

export default WelcomePage;
