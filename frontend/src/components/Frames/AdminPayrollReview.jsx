import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/PayrollPages.css';

const AdminPayrollReview = () => {
  const { tutorId } = useParams();
  const [confirmedHours, setConfirmedHours] = useState(0);
  const [nonConfirmedHours, setNonConfirmedHours] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    console.log("📦 Tutor ID from URL:", tutorId); // Debug log

    const fetchPayroll = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/payroll/${tutorId}`);
        const data = await res.json();

        if (res.ok) {
          setConfirmedHours(data.confirmedHours || 0);
          setNonConfirmedHours(data.nonConfirmedHours || 0);
          setStatus('');
        } else {
          setStatus(`❌ Failed to load data: ${data.message}`);
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setStatus('❌ Error fetching tutor data.');
      }
    };

    if (tutorId && tutorId.length === 24) fetchPayroll();
    else setStatus('❌ Invalid tutor ID');
  }, [tutorId]);

  const handleConfirm = async () => {
    const adminId = localStorage.getItem('userId');
    console.log("🟢 Confirm clicked — Admin ID:", adminId, "| Tutor ID:", tutorId);

    if (!adminId || !tutorId) {
      setStatus('❌ Missing admin or tutor ID.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutor: tutorId,
          confirmedBy: adminId
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setConfirmedHours(data.updatedConfirmedHours);
        setNonConfirmedHours(0);
        setStatus('✅ Payroll confirmed.');
      } else {
        console.error("❌ Backend error:", data.message);
        setStatus(`❌ Server error: ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Failed to send POST:", err);
      setStatus('❌ Failed to confirm payroll.');
    }
  };

  return (
    <div className="page-wrapper">
      <h2>Payroll Review for Tutor: {tutorId}</h2>

      <div className="payroll-box">
        <p><strong>Confirmed Hours:</strong> {confirmedHours}</p>
        <p><strong>Unconfirmed Hours:</strong> {nonConfirmedHours}</p>
      </div>

      <button
        className="confirm-btn"
        onClick={handleConfirm}
        disabled={nonConfirmedHours === 0}
      >
        Confirm Payroll
      </button>

      {status && (
        <p className={`status-msg ${status.includes('✅') ? 'success' : 'error'}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default AdminPayrollReview;
