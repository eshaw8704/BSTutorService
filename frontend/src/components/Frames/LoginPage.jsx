import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import confetti from 'canvas-confetti';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from './Header'; // ✅ include Header

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        setEmail('');
        setPassword('');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

        if (data.token && data.user && data.user._id && data.user.role) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('userId', data.user._id);

          if (data.user.role === 'admin') {
            navigate('/admin/admindashboard');
          } else if (data.user.role === 'tutor') {
            navigate('/tutordashboard');
          } else if (data.user.role === 'student') {
            navigate('/studentdashboard');
          } else {
            navigate('/');
          }
        } else {
          alert("Login failed: Incomplete user data.");
        }
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login');
    }
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password-icon"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="back-link" onClick={() => navigate('/')}>
            ← Return to Welcome Page
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
