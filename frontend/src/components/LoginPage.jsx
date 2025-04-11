import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import confetti from 'canvas-confetti';

// displays a login form and handles the form submission
function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // to navigate instance
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // parse the response
      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        setEmail('');
        setPassword('');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      
        // checks if the logged-in user is an admin
        if (data.user && data.user.role === 'admin') {
          // redirected to admin dashboard
          navigate('/admin/dashboard');
        } else {
          // redirect to a home page)
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

  // render the component
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