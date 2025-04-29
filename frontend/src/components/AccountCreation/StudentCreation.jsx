import React, { useState } from 'react';
import './StudentCreation.css';
//import confetti from 'canvas-confetti';

import { useNavigate } from 'react-router-dom'; // <-- Import for navigation
import './StudentCreation.css';

function StudentCreation() {

  // state variables to manage form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // <-- Initialize the navigate hook

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role: 'student' }),
      });
  
      // parse the response
      const data = await response.json();
      if (response.ok) {
        alert('Student account created successfully!');
        // populate Clone DB for data validation
        // reset fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        // confetti trigger
        /*confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });*/
        navigate('/studentdashboard'); // <-- Redirect to dashboard after success
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };
  

  // render the component
  return (
    <div className="student-creation-container">
      <h2>Create Student Account</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default StudentCreation;
