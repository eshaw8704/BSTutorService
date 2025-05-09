// src/components/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './WelcomePage.css';
import Header from './Header'; // ✅ include Header
import yellowLogo from "../../assets/yellowBS.png";

function WelcomePage() {
  const navigate = useNavigate();

  const goToStudentCreation = () => navigate('/student');
  const goToTutorCreation = () => navigate('/tutor');
  const goToAdminCreation = () => navigate('/admin-create');
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

      <motion.div
        className="right-content"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={yellowLogo}
          alt="BSTutors Yellow Logo"
          className="yellow-logo"
        />
      </motion.div>
    </div>
  );
}

export default WelcomePage;
