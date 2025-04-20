import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  if (!user) return <p>Loading profile...</p>;

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}
