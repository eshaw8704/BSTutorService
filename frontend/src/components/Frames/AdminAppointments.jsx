import React, { useEffect, useState } from 'react';
import './AdminAppointments.css';

export default function AdminAppointments() {
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);
  const [view, setView] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const [resUpcoming, resHistory] = await Promise.all([
          fetch('/api/appointments/all/upcoming'),
          fetch('/api/appointments/all/history'),
        ]);

        const upcomingData = await resUpcoming.json();
        const historyData = await resHistory.json();

        if (!Array.isArray(upcomingData)) throw new Error(upcomingData.message || 'Invalid upcoming data');
        if (!Array.isArray(historyData)) throw new Error(historyData.message || 'Invalid history data');

        setUpcoming(upcomingData);
        setHistory(historyData);
        setError('');
      } catch (err) {
        console.error('❌ Failed to load appointments:', err);
        setError(err.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const appointments = view === 'upcoming' ? upcoming : history;

  return (
    <div className="page-wrapper">
      <h2>Admin Appointments ({view})</h2>

      <div className="tab-toggle">
        <button onClick={() => setView('upcoming')} className={view === 'upcoming' ? 'active' : ''}>
          Upcoming
        </button>
        <button onClick={() => setView('history')} className={view === 'history' ? 'active' : ''}>
          History
        </button>
      </div>

      {loading ? (
        <p>Loading appointments…</p>
      ) : error ? (
        <p className="status-msg error">{error}</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Tutor</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => {
              const date = new Date(appt.date);
              return (
                <tr key={appt._id}>
                  <td>{appt.student?.firstName} {appt.student?.lastName}</td>
                  <td>{appt.tutor?.firstName} {appt.tutor?.lastName}</td>
                  <td>{date.toLocaleDateString()}</td>
                  <td>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
