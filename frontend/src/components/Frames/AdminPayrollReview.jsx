// src/components/Frames/AdminPayrollReview.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }    from 'react-router-dom';
import '../Styles/PayrollPages.css';

export default function AdminPayrollReview() {
  const { tutorId }           = useParams();
  const navigate              = useNavigate();
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [confirming, setConfirming] = useState(false);
  const token = localStorage.getItem('token');

  const rate = 20;

  useEffect(() => {
    async function fetchPayroll() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/payroll/tutor/${tutorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setPayroll(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPayroll();
  }, [tutorId]);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const adminId = localStorage.getItem('userId');
      const res = await fetch(`http://localhost:5000/api/payroll/tutor/${tutorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:   `Bearer ${token}`
        },
        body: JSON.stringify({ confirmedBy: adminId })
      });
      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      setPayroll(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirming(false);
    }
  };

  if (loading)  return <p className="status-msg">Loading…</p>;
  if (error)    return <p className="status-msg error">{error}</p>;
  if (!payroll) return <p className="status-msg">No payroll data available.</p>;

  const confirmedHours   = payroll.confirmedHours   ?? 0;
  const unconfirmedHours = payroll.unconfirmedHours ?? 0;
  const earnings         = (confirmedHours * rate).toFixed(2);

  return (
    <div className="review-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="payroll-card">
        <h2 className="card-title">Payroll for Tutor</h2>

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
          <span>${earnings}</span>
        </div>

        {/* Always show button */}
        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={confirming}
        >
          {confirming ? 'Confirming…' : 'Confirm Payroll'}
        </button>

        {/* Show last‐confirmed notice if we have a timestamp */}
        {payroll.confirmedAt && (
          <div className="confirmed" style={{ marginTop: '1rem' }}>
            <span className="check-icon">✅</span>
            <span>
              Last confirmed on{' '}
              {new Date(payroll.confirmedAt).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}