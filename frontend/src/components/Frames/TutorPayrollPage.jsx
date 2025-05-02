// components/Frames/TutorPayrollPage.jsx
import React, { useEffect, useState } from 'react';
import '../Styles/PayrollPages.css';

export default function TutorPayrollPage() {
  const tutorId = localStorage.getItem('userId');
  const token   = localStorage.getItem('token');

  const [payroll,    setPayroll]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [showForm,   setShowForm]   = useState(false);
  const [date,       setDate]       = useState('');
  const [hoursWorked, setHoursWorked] = useState('');

  const loadPayroll = async () => {
    if (!tutorId) {
      setError('Tutor not logged in');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/payroll/tutor/${tutorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      // wrap single object into array so map/table works
      const arr = Array.isArray(data) ? data : [data];
      setPayroll(arr);
    } catch (err) {
      console.error('Error fetching payroll:', err);
      setError('Failed to fetch payroll');
      setPayroll([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayroll();
  }, [tutorId]);

  const submitHours = async (e) => {
    e.preventDefault();
    const hrs = parseFloat(hoursWorked);
    if (!hrs || hrs <= 0) {
      return alert('Enter a valid number of hours');
    }

    try {
      const res = await fetch('/api/payroll', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({
          tutor: tutorId,
          hoursWorked: hrs,
          date
        })
      });
      if (!res.ok) throw new Error(await res.text());

      // clear form and reload
      setShowForm(false);
      setDate('');
      setHoursWorked('');
      await loadPayroll();
    } catch (err) {
      console.error('Error submitting hours:', err);
      alert(`Could not submit hours: ${err.message}`);
    }
  };

  return (
    <div className="payroll-wrapper">
      <div className="payroll-header">
        <h2>Your Payroll</h2>
        <button 
          className="add-hours-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Hours'}
        </button>
      </div>

      {showForm && (
        <form className="add-hours-form" onSubmit={submitHours}>
          <label>
            Date
            <input 
              type="date" 
              value={date}
              onChange={e => setDate(e.target.value)} 
              required 
            />
          </label>
          <label>
            Hours
            <input 
              type="number" 
              step="0.25" 
              min="0"
              value={hoursWorked}
              onChange={e => setHoursWorked(e.target.value)} 
              required 
            />
          </label>
          <button type="submit" className="confirm-btn">Submit</button>
        </form>
      )}

      {loading   && <p>Loading…</p>}
      {error     && <p className="status-msg error">{error}</p>}
      {!loading && !error && payroll.length === 0 && <p>No records found.</p>}

      {payroll.length > 0 && (
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
            {payroll.map(rec => (
              <tr key={rec._id}>
                <td>{new Date(rec.createdAt).toLocaleDateString()}</td>
                <td>{rec.confirmedHours}</td>
                <td>{rec.nonConfirmedHours}</td>
                <td>
                  {rec.confirmedBy
                    ? `${rec.confirmedBy.firstName} ${rec.confirmedBy.lastName}`
                    : 'Pending'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
