// log hours for a tutor
import React, { useState } from 'react';

export default function LogHoursForm({ tutorId, onLogged }) {
  const [date, setDate]   = useState('');
  const [hours, setHours] = useState('');
  const [notes, setNotes] = useState('');
  const [error,   setError]   = useState('');      
  const [success, setSuccess] = useState('');  

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
        const res = await fetch(`http://localhost:5000/api/payroll/tutor/${tutorId}/log-hours`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ date, hours, notes })
      });
      if (!res.ok) {        
      const errText = await res.text();
      throw new Error(errText);
    }
      // success!
      setDate(''); setHours(''); setNotes('');
      setSuccess('Hours logged successfully!');
      onLogged(); // refresh the logged hours list
      // clear the success after a few seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
        console.error('Log hours failed:', err);
        setError(err.message || 'Failed to log hours');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="log-hours-form">
      <h3>Log Off-Platform Hours</h3>
      {error   && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <label>
        Date:
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
      </label>
      <label>
        Hours:
        <input type="number" step="0.25" value={hours} onChange={e=>setHours(e.target.value)} required />
      </label>
      <label>
        Notes:
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} />
      </label>
      <button type="submit" className="submit-btn">
        Submit
      </button>   
  </form>
  );
}