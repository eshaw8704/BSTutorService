import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/PayrollPages.css'; // ✅ Import CSS

const AdminPayrollList = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/users/tutors')
      .then((res) => res.json())
      .then(setTutors)
      .catch(() => setError("Could not load tutors."));
  }, []);

  return (
    <div className="page-wrapper"> {/* ✅ Wrap */}
      <h2>Admin Payroll List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul className="tutor-list">
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
