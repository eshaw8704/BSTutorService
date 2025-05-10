// src/components/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './WelcomePage.css';
import yellowLogo from "../../assets/yellowBS.png";
import Header from '../Frames/Header';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
       <Header />
      <motion.div
        className="left-content"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="subtitle">
          Study Smarter, <br /> Not Harder <br />
          <span>- With Expert Tutors</span>
        </p>

        <div className="button-group">
          <button className="welcome-button" onClick={() => navigate('/student')}>
            Create Student Account
          </button>
          <button className="welcome-button" onClick={() => navigate('/tutor')}>
            Create Tutor Account
          </button>
          <button className="welcome-button" onClick={() => navigate('/admin-create')}>
            Create Admin Account
          </button>
          <button className="welcome-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </motion.div>

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
