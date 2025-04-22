import React, { useEffect, useState } from 'react';
import '../Styles/PayrollPages.css'; // ✅ Import CSS

const TutorPayrollPage = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const tutorId = localStorage.getItem('userId');

  useEffect(() => {
    if (!tutorId) {
      setError("Tutor not logged in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/payroll/tutor/${tutorId}`)
      .then(res => res.json())
      .then(data => {
        setPayrollData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch payroll.");
        setLoading(false);
      });
  }, [tutorId]);

  return (
    <div className="page-wrapper"> {/* ✅ Wrap */}
      <h2>Your Payroll</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="status-msg" style={{ color: 'red' }}>{error}</p>}

      {payrollData.length === 0 && !loading && <p>No records found.</p>}

      {payrollData.length > 0 && (
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Confirmed Hours</th>
              <th>Unconfirmed Hours</th>
              <th>Confirmed By</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((entry) => (
              <tr key={entry._id}>
                <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                <td>{entry.confirmedHours}</td>
                <td>{entry.nonConfirmedHours}</td>
                <td>{entry.confirmedBy ? `${entry.confirmedBy.firstName} ${entry.confirmedBy.lastName}` : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TutorPayrollPage;
