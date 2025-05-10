// src/components/Frames/TutorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TutorDashboard.css';
import LogHoursForm from './LogHoursForm';
import UpcomingAppointmentsFrame from '../UpcomingAppointments';


export default function TutorDashboard() {
  const [profile, setProfile]         = useState(null);
  const [hoursLogged, setHoursLogged] = useState(0);
  const [pendingHours, setPendingHours] = useState(0);
  const [sessionsDone, setSessionsDone] = useState(0);
  const [upcoming, setUpcoming]       = useState([]);
  const [history, setHistory]         = useState([]);

  const token   = localStorage.getItem('token');
  const tutorId = localStorage.getItem('userId');
  const navigate = useNavigate();

  // ─── 1) Load current user profile ───────────────────────────────────────
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(await res.text());
        setProfile(await res.json());
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    })();
  }, [token]);

  // ─── 2) Load appointments + payroll ─────────────────────────────────────
  const fetchSessions = async () => {
    try {
      // a) Appointments
      const resAll = await fetch(`/api/appointments/tutor/${tutorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!resAll.ok) throw new Error(await resAll.text());
      const dataAll = await resAll.json();

      // b) Split upcoming / history
      const now = new Date();
      const upcomingRaw = dataAll.filter(a =>
        a.status === 'scheduled' || new Date(a.appointmentDate) >= now
      );
      const historyRaw = dataAll.filter(a =>
        a.status === 'completed' || new Date(a.appointmentDate) < now
      );

      // c) Map into state
      setUpcoming(
        upcomingRaw.map(a => ({
          id:      a._id,
          time:    `${new Date(a.appointmentDate).toLocaleDateString()} @ ${a.appointmentTime}`,
          student: a.student
            ? `${a.student.firstName} ${a.student.lastName}`
            : 'Unknown',
          subject: a.subject || 'Unknown',
        }))
      );
      setHistory(
        historyRaw.map(a => ({
          id:      a._id,
          time:    `${new Date(a.appointmentDate).toLocaleDateString()} @ ${a.appointmentTime}`,
          student: a.student
            ? `${a.student.firstName} ${a.student.lastName}`
            : 'Unknown',
          subject: a.subject || 'Unknown',
        }))
      );
      setSessionsDone(historyRaw.length);

      // d) Payroll (pending hours)
      const resPayroll = await fetch(`/api/payroll/tutor/${tutorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let payroll = { unconfirmedHours: 0 };
      if (resPayroll.ok) payroll = await resPayroll.json();
      setPendingHours(payroll.unconfirmedHours);

      // e) Compute total hours
      setHoursLogged(historyRaw.length + payroll.unconfirmedHours);

    } catch (err) {
      console.error('Error fetching sessions/payroll:', err);
    }
  };

  useEffect(() => {
    if (tutorId) fetchSessions();
  }, [tutorId, token]);

  // ─── 3) Mark completed handler ─────────────────────────────────────────
  const markCompleted = async appointmentId => {
    try {
      const res = await fetch(
        `/api/appointments/${appointmentId}/complete`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      const body = await res.json();
      if (!res.ok) {
        // show the “Too early…” or any other server message
        throw new Error(body.message || res.statusText);
      }
      // success — now refresh your lists
      await fetchSessions();
    } catch (err) {
      alert(err.message);   // e.g. “Too early to complete…”
      console.error('Mark complete failed:', err);
    }
  };
  

  // ─── 4) Table component ─────────────────────────────────────────────────
  const Table = ({ data, showAction }) => (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Student</th>
          <th>Subject</th>
          {showAction && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.time}</td>
            <td>{row.student}</td>
            <td>{row.subject}</td>
            {showAction && (
              <td>
                <button
                  className="mark-complete-btn"
                  onClick={() => markCompleted(row.id)}
                >
                  Mark Completed
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="tutor-main">
      {/* Profile section */}
      {profile && (
        <section className="profile-section">
          <h2 className="profile-title">{profile.firstName} {profile.lastName}</h2>
          {profile.bio && <p className="bio">{profile.bio}</p>}
        </section>
      )}

      {/* Summary cards */}
      <section className="cards-row">
        <div className="info-card">
          <h4>Hours Logged</h4>
          <p>{hoursLogged}</p>
        </div>
        <div className="info-card">
          <h4>Pending Hours</h4>
          <p>{pendingHours}</p>
        </div>
        <div className="info-card">
          <h4>Sessions Completed</h4>
          <p>{sessionsDone}</p>
        </div>
        <div className="info-card">
          <h4>Upcoming Sessions</h4>
          <p>{upcoming.length}</p>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="session-section">
        <h3>Upcoming Sessions</h3>
        {upcoming.length > 0 ? (
          <Table data={upcoming} showAction={true} />
        ) : (
          <p>No upcoming sessions.</p>
        )}
      </section>

      {/* Session History */}
      <section className="session-section">
        <h3>Session History</h3>
        {history.length > 0 ? (
          <Table data={history} showAction={false} />
        ) : (
          <p>No session history available.</p>
        )}
      </section>

      {/* Off-platform hours logging */}
      <section className="log-hours-section">
        <LogHoursForm tutorId={tutorId} onLogged={fetchSessions} />
      </section>
    </div>
  );
}