import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/PayrollPages.css';

const AdminPayrollList = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/tutors');
        const data = await res.json();

        if (res.ok) {
          setTutors(data);
        } else {
          setError(data.message || "Failed to fetch tutors.");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Could not load tutors.");
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="page-wrapper">
      <h2>Admin Payroll List</h2>
      {error && <p className="status-msg error">{error}</p>}

      {tutors.length === 0 ? (
        <p>No tutors found.</p>
      ) : (
        <ul className="tutor-list">
          {tutors.map((tutor) => (
            <li key={tutor._id}>
              <button onClick={() => navigate(`/adminpayroll/${tutor._id}`)}>
                {tutor.firstName} {tutor.lastName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPayrollList;
