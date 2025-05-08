import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Frames/Header';
import './AdminCreation.css';

function AdminCreation() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role: 'admin',
          secretKey
        }),
      });

      const data = await response.json();
      if (response.ok && data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userId', data.user._id);
        alert('Admin account created and logged in!');
        navigate('/admin/dashboard');
      } else {
        alert(`Error: ${data.message || 'Invalid secret key or response'}`);
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Error creating admin account');
    }
  };

  return (
    <>
      <Header />
      <div className="admin-creation-container">
        <h2>Create Admin Account</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Admin Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        <p className="back-link" onClick={() => navigate('/')}>← Return to Welcome Page</p>
      </div>
    </>
  );
}

export default AdminCreation;
