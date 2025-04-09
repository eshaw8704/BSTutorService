import React, { useState } from 'react';
import './LoginPage.css';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      console.log('Login response:', data); // ✅ Debug the response

      if (response.ok) {
        alert('Login successful!');
        setEmail('');
        setPassword('');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

        // ✅ Role-based navigation
        if (data.role === 'tutor') {
          navigate('/tutordashboard');
        } else if (data.role === 'student') {
          navigate('/dashboard');
        } else {
          alert('Unknown role. Redirecting to home.');
          navigate('/');
        }
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login');
    }
  };

  return (
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
