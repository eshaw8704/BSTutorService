// src/components/Frames/AdminAppointments.jsx

import React, { useEffect, useState } from 'react';
import './AdminAppointments.css';

export default function AdminAppointments() {
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory]   = useState([]);
  const [view, setView]         = useState('upcoming');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const [resUp, resHist] = await Promise.all([
          fetch('/api/appointments/all/upcoming'),
          fetch('/api/appointments/all/history'),
        ]);
        const upData   = await resUp.json();
        const histData = await resHist.json();

        if (!Array.isArray(upData))   throw new Error(upData.message   || 'Invalid upcoming data');
        if (!Array.isArray(histData)) throw new Error(histData.message || 'Invalid history data');

        setUpcoming(upData);
        setHistory(histData);
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

  const rawList = view === 'upcoming' ? upcoming : history;

  // Filter out any appts without a tutor, then sort by date:
  const appointments = rawList
    .filter(appt => appt.tutor && appt.appointmentDate)
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  const parseDate = (raw) => {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? raw : d;
  };

  return (
    <div className="page-wrapper">
      <h2>Admin Appointments ({view})</h2>

      <div className="tab-toggle">
        <button
          onClick={() => setView('upcoming')}
          className={view === 'upcoming' ? 'active' : ''}
        >
          Upcoming
        </button>
        <button
          onClick={() => setView('history')}
          className={view === 'history' ? 'active' : ''}
        >
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
              const d = parseDate(appt.appointmentDate);
              return (
                <tr key={appt._id}>
                  <td>
                    {appt.student
                      ? `${appt.student.firstName} ${appt.student.lastName}`
                      : '–'}
                  </td>
                  <td>
                    {`${appt.tutor.firstName} ${appt.tutor.lastName}`}
                  </td>
                  <td>
                    {d instanceof Date
                      ? d.toLocaleDateString()
                      : d}
                  </td>
                  <td>{appt.appointmentTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
