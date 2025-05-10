import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Frames/Header';
import './StudentCreation.css';

function StudentCreation() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role: 'student' }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Student account created successfully!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        navigate('/studentdashboard');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  return (
    <>
      <Header />
      <div className="student-creation-container">
        <h2>Create Student Account</h2>
        <form onSubmit={handleSubmit} className="student-form">
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        <p className="back-link" onClick={() => navigate('/')}>← Return to Welcome Page</p>
      </div>
    </>
  );
}

export default StudentCreation;
