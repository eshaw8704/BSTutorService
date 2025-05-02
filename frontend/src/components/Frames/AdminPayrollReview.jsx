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

  // fixed rate
  const rate = 20;

  // Fetch on mount
  useEffect(() => {
    async function fetchPayroll() {
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
    }
    fetchPayroll();
  }, [tutorId]);

  // Confirm handler
  const handleConfirm = async () => {
    setConfirming(true);

    // Optimistically merge hours in UI
    setPayroll(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        confirmedHours:   (prev.confirmedHours   ?? 0) + (prev.unconfirmedHours ?? 0),
        unconfirmedHours: 0,
        confirmed:        true,
        confirmedAt:      new Date().toISOString(),
      };
    });

    try {
      const adminId = localStorage.getItem('userId');
      const res = await fetch(`/api/payroll/tutor/${tutorId}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ confirmedBy: adminId })
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

  // Pull out fields
  const confirmedHours   = payroll.confirmedHours   ?? 0;
  const unconfirmedHours = payroll.unconfirmedHours ?? 0;
  const confirmed        = payroll.confirmed       ?? false;
  const earnings         = rate * confirmedHours;

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
          <span>${earnings.toFixed(2)}</span>
        </div>

        {!confirmed ? (
          <button
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={confirming}
          >
            {confirming ? 'Confirming…' : 'Confirm Payroll'}
          </button>
        ) : (
          <div className="confirmed">
            <span className="check-icon">✅</span>
            <span>Payroll confirmed</span>
          </div>
        )}
      </div>
    </div>
  );
}
