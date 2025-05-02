import React, { useEffect, useState } from 'react';
import '../Styles/PayrollPages.css';

export default function AdminPayrollReview({ tutorId, onBack }) {
  const [record, setRecord] = useState(null);
  const [status, setStatus] = useState('');
  const RATE = 20;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res  = await fetch(`/api/payroll/tutor/${tutorId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (cancelled) return;
        if (data && data.confirmedHours != null) {
          setRecord(data);
        } else {
          setStatus('❌ No payroll record found');
        }
      } catch {
        if (!cancelled) setStatus('❌ Error fetching payroll');
      }
    })();
    return () => { cancelled = true; };
  }, [tutorId]);

  const handleConfirm = async () => {
    const adminId = localStorage.getItem('userId');

    try {
      const res = await fetch('http://localhost:5000/api/payroll/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tutor: tutorId, confirmedBy: adminId })
      });

      const data = await res.json();
      console.log('POST /api/payroll/confirm →', res.status, data);

      if (!res.ok) {
        const msg = data.message || 'Could not confirm';
        throw new Error(msg);
      }

      // Update record + success message
      setRecord(data.payroll || data); // API returns { payroll, message }
      setStatus('✅ Payroll confirmed and email sent to tutor');
    } catch (err) {
      console.error('Confirm failed:', err);
      setStatus(`❌ ${err.message || 'Could not confirm'}`);
    }
  };

  const earnings = record
    ? (record.confirmedHours * RATE).toFixed(2)
    : '0.00';

  return (
    <div className="page-wrapper">
      <button className="back-button" onClick={onBack}>← Back</button>
      <h2>Payroll for {record?.tutor?.firstName ?? 'Tutor'} {record?.tutor?.lastName ?? ''}</h2>

      {record ? (
        <>
          <div className="payroll-box">
            <p><strong>Rate:</strong> ${RATE}/hr</p>
            <p><strong>Confirmed Hours:</strong> {record.confirmedHours}</p>
            <p><strong>Unconfirmed Hours:</strong> {record.nonConfirmedHours}</p>
          </div>
          <div className="earnings-box">
            <p><strong>Earnings:</strong> ${earnings}</p>
          </div>
          <button
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={!record.nonConfirmedHours}
          >
            Confirm Payroll & Email Tutor
          </button>
        </>
      ) : (
        <p className="status-msg error">{status || 'Loading…'}</p>
      )}

      {record && status && (
        <p className={`status-msg ${status.startsWith('✅') ? 'success' : 'error'}`}>
          {status}
        </p>
      )}
    </div>
  );
}
