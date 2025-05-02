import React, { useEffect, useState } from 'react';
import { useNavigate }                from 'react-router-dom';
import DashboardLayout from "../DashboardLayout";
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const navigate            = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) return <p>Loading profile…</p>;
  if (error)   return <p className="error">{error}</p>;

  const {
    firstName, lastName, email, role,
    experience, institution, biography, profilePicture
  } = user;

  return (
    <div className="profile-container">
      <header className="profile-header">
        <img
          src={profilePicture || '/default-avatar.png'}
          alt="Profile"
          className="profile-pic"
        />
        <h2>{firstName} {lastName}</h2>
        <div className="profile-actions">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}>Logout</button>
        </div>
      </header>

      <section className="profile-details">
        <p><strong>Name:</strong> {firstName} {lastName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>

        {role === 'tutor' && (
          <>
            <p><strong>Experience:</strong> {experience}</p>
            <p><strong>Institution:</strong> {institution}</p>
            <p><strong>Biography:</strong> {biography}</p>
          </>
        )}
      </section>
    </div>
  );
}