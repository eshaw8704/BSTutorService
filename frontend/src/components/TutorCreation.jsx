import React, { useState } from 'react';
import './TutorCreation.css';
import confetti from 'canvas-confetti';

// This component allows the admin to create a new tutor account
// It includes a form with fields for first name, last name, email, and password
function TutorCreation() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');

  // This function handles the form submission
  // It sends a POST request to the server with the user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role: 'tutor' }),
      });

      // Handle the response from the server
      const data = await response.json();
      if (response.ok) {
        alert('Tutor account created successfully!');
        //Populate Clone DB for data validation
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating tutor:', error);
      alert('Error creating tutor account');
    }
  };

  // Render the form for creating a new tutor account
  // It includes fields for first name, last name, email, and password
  return (
    <div className="tutor-creation-container">
      <h2>Create Tutor Account</h2>
      <form onSubmit={handleSubmit} className="tutor-form">
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

export default TutorCreation;
