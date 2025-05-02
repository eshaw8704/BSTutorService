// src/components/Frames/Settings.jsx
import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';
import DashboardLayout      from '../DashboardLayout';
import './Settings.css';

export default function Settings() {
  const [newEmail, setNewEmail]         = useState('');
  const [currentPassword, setPassword]  = useState('');
  const [message, setMessage]           = useState('');
  const navigate                         = useNavigate();

  const token = localStorage.getItem('token');

  const handleChangeEmail = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/email', {
        method: 'PUT',
        headers: {
          'Content-Type':  'application/json',
          Authorization:   `Bearer ${token}`
        },
        body: JSON.stringify({ email: newEmail })
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage('Email updated!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/password', {
        method: 'PUT',
        headers: {
          'Content-Type':  'application/json',
          Authorization:   `Bearer ${token}`
        },
        body: JSON.stringify({ password: currentPassword })
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage('Password changed!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Please dont go..this means goodbye?')) return;
    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(await res.text());
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <DashboardLayout role="">
      <div className="settings-container">
        <h1>Settings</h1>
        {message && <p className="msg">{message}</p>}

        <section className="sect">
          <h2>Change Email</h2>
          <input
            type="email"
            placeholder="New email"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
          />
          <button onClick={handleChangeEmail}>Update Email</button>
        </section>

        <section className="sect">
          <h2>Change Password</h2>
          <input
            type="password"
            placeholder="New password"
            value={currentPassword}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>Update Password</button>
        </section>

        <section className="sect danger">
          <h2>Delete Account</h2>
          <button onClick={handleDelete}>Delete My Account</button>
        </section>
      </div>
    </DashboardLayout>
  );
}
