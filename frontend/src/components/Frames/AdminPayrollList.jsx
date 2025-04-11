import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPayrollList = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/tutors') // 👈 Make sure this route exists
      .then(res => res.json())
      .then(data => setTutors(data))
      .catch(err => console.error("Error fetching tutors:", err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Payroll List</h2>
      <ul>
        {tutors.map((tutor) => (
          <li key={tutor._id}>
            <button onClick={() => navigate(`/adminpayroll/${tutor._id}`)}>
              {tutor.firstName} {tutor.lastName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPayrollList;
  