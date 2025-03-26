import React, { useState } from 'react';

function StudentCreation() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role: 'student' }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Student account created successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem' }}>
      <h2>Create Student Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
        /> 
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ margin: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#6a0dad', color: 'white', borderRadius: '5px' }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default StudentCreation;
