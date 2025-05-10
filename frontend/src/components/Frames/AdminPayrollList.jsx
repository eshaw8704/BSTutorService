import React, { useEffect, useState } from 'react';
import { useNavigate }                  from 'react-router-dom';
import '../Styles/PayrollPages.css';

export default function AdminPayrollList() {
  const [tutors, setTutors] = useState([]);
  const [error, setError]   = useState('');
  const navigate            = useNavigate();

  useEffect(() => {
    fetch('/api/users/tutors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTutors(data);
        else setError(data.message || 'Failed to fetch tutors');
      })
      .catch(err => {
        console.error(err);
        setError('Error loading tutors');
      });
  }, []);

  return (
    <div className="page-wrapper">
      <h2>Admin Payroll List</h2>
      {error && <p className="status-msg error">{error}</p>}

      {tutors.length === 0 ? (
        <p>No tutors found.</p>
      ) : (
        <ul className="tutor-list">
          {tutors.map(t => (
            <li key={t._id}>
              <button onClick={() => navigate(`${t._id}`)}>
                {t.firstName} {t.lastName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
