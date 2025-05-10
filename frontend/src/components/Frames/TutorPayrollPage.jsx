import React, { useEffect, useState } from 'react';
import { useNavigate }                from 'react-router-dom';
import DashboardLayout                from '../DashboardLayout';
import '../Styles/PayrollPages.css';

export default function TutorPayrollPage() {
  const navigate = useNavigate();
  const [date, setDate]     = useState('');
  const [hours, setHours]   = useState('');
  const [payroll, setPayroll]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]     = useState('');

  const user    = JSON.parse(localStorage.getItem('user') || '{}');
  const tutorId = user._id;
  const rate    = 20;

  const fetchPayroll = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/payroll/tutor/${tutorId}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setPayroll(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tutorId) fetchPayroll();
  }, [tutorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/payroll', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          tutor:       tutorId,
          hoursWorked: Number(hours),
          date
        })
      });
      if (!res.ok) throw new Error(await res.text());
      await res.json();
      setDate('');
      setHours('');
      await fetchPayroll();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="status-msg">Loading your payroll…</p>;
  if (error)   return <p className="status-msg error">{error}</p>;
  if (!payroll) return null;

  const confirmedHours   = payroll.confirmedHours   ?? 0;
  const unconfirmedHours = payroll.unconfirmedHours ?? 0;
  const earnings         = rate * confirmedHours;

  return (
    <DashboardLayout role="tutor">
      <div className="tutor-payroll-page">
        <div className="header-row">
          <h2>Your Payroll</h2>
          <button
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-hours-form">
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
              min="0"
              step="0.5"
              value={hours}
              onChange={e => setHours(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </form>

        <div className="payroll-card">
          <div className="field">
            <span className="label">Rate:</span>
            <span>${rate}/hr</span>
          </div>
          <div className="field">
            <span className="label">Confirmed Hours:</span>
            <span>{confirmedHours}</span>
          </div>
          <div className="field">
            <span className="label">Unconfirmed Hours:</span>
            <span>{unconfirmedHours}</span>
          </div>
          <div className="field">
            <span className="label">Earnings:</span>
            <span>${earnings.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
