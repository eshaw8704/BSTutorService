import React, { useEffect, useState } from 'react';
import { useNavigate }                from 'react-router-dom';
import DashboardLayout                from '../DashboardLayout';
//import DashboardLayout from "../DashboardLayout";
import './Profile.css';

export default function Profile() {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const navigate              = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      // 1) Grab token
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
  
      try {
        // 2) Fetch profile from your Express backend
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
  
        if (res.status === 401) throw new Error('Not authorized');
        if (!res.ok)         throw new Error('Failed to load profile');
  
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
  
    loadProfile();
  }, []);
  
  
  const handleChange = e => {
    const { name, value } = e.target;
    setUser(u => ({ ...u, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type':  'application/json',
          Authorization:   `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName:     user.firstName,
          lastName:      user.lastName,
          experience:    user.experience,
          institution:   user.institution,
          biography:     user.biography,
          profilePicture: user.profilePicture
        })
      });
      if (!res.ok) throw new Error('Save failed');
      alert('Profile saved!');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading profile…</p>;
  if (error)   return <p className="error">{error}</p>;

  const {
    firstName    = '',
    lastName     = '',
    email        = '',
    role         = '',
    experience   = '',
    institution  = '',
    biography    = '',
    profilePicture
  } = user;

// at the top of your Profile() component
const handlePicChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const previewUrl = URL.createObjectURL(file);
    setUser(u => ({ ...u, profilePicture: previewUrl }));
  }
};


  return (
    <DashboardLayout role={role}>
      <div className="profile-container">
      <header className="profile-header">
          <img
            src={profilePicture || '/default-avatar.png'}
            alt="Profile"
            className="profile-avatar"
          />     
         <input
         type="file"
         accept="image/*"
         className="pic-upload"
         onChange={handlePicChange}
       />
        <h2 className="profile-name">{firstName} {lastName}</h2>     
        </header>

        <section className="profile-form">
          <div className="field">
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={handleChange}
            />
          </div>
  
          <div className="field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={email}
              readOnly
            />
          </div>

          <div className="field">
            <label>Role</label>
            <input
              name="role"
              type="text"
              value={role}
              readOnly
            />
          </div>
  
          {role === 'tutor' && (
            <>
              <div className="field">
                <label>Experience</label>
                <input
                  name="experience"
                  type="text"
                  value={experience}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Institution</label>
                <input
                  name="institution"
                  type="text"
                  value={institution}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Biography</label>
                <textarea
                  name="biography"
                  rows="4"
                  value={biography}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button className="save-btn" onClick={handleSave}>
            Save Profile
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}