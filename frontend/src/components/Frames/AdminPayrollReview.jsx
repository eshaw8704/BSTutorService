import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/PayrollPages.css'; // ✅ Make sure this path matches your project

const AdminPayrollReview = () => {
  const { tutorId } = useParams(); // pulled from URL
  const [confirmedHours, setConfirmedHours] = useState('');
  const [nonConfirmedHours, setNonConfirmedHours] = useState('');
  const [status, setStatus] = useState('');

  const handleConfirm = async () => {
    console.log("🟢 Confirm button clicked");

    const adminId = localStorage.getItem('userId');
    if (!adminId || !tutorId) {
      setStatus("❌ Missing tutor or admin ID.");
      return;
    }

    if (!confirmedHours || !nonConfirmedHours) {
      setStatus("⚠️ Please enter both confirmed and non-confirmed hours.");
      return;
    }

    const requestBody = {
      tutor: tutorId,
      confirmedHours: Number(confirmedHours),
      nonConfirmedHours: Number(nonConfirmedHours),
      confirmedBy: adminId
    };

    console.log("📤 Sending payroll:", requestBody);

    try {
      const res = await fetch('http://localhost:5000/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Payroll confirmed successfully.");
      } else {
        console.error("❌ Server error:", data.message);
        setStatus("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      setStatus("❌ Request failed.");
    }
  };

  return (
    <div className="page-wrapper">
      <h2>Payroll Review for Tutor ID: {tutorId}</h2>

      <label>
        Confirmed Hours:
        <input
          type="number"
          value={confirmedHours}
          onChange={(e) => setConfirmedHours(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        Non-confirmed Hours:
        <input
          type="number"
          value={nonConfirmedHours}
          onChange={(e) => setNonConfirmedHours(e.target.value)}
        />
      </label>

      <br /><br />

      <button className="confirm-btn" onClick={handleConfirm}>
        Confirm Payroll
      </button>

      {status && <p className="status-msg">{status}</p>}
    </div>
  );
};

export default AdminPayrollReview;
