import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './TutorDashboard.css';

export default function TutorDashboard() {
  const navigate = useNavigate();

  const [profile,     setProfile]     = useState({});
  const [hoursLogged, setHoursLogged] = useState(0);
  const [sessionsDone,setSessionsDone]= useState(0);
  const [upcoming,    setUpcoming]    = useState([]);
  const [history,     setHistory]     = useState([]);

  // get the logged-in tutor’s ID from localStorage
  const tutorId = localStorage.getItem('userId');

  // helper to show “10:00 AM – 11:00 AM” for a Date string
  const formatTimeRange = (dateString, durationMinutes = 60) => {
    const start = new Date(dateString);
    const end   = new Date(start.getTime() + durationMinutes * 60000);
    const opts  = { hour: 'numeric', minute: '2-digit' };
    return `${start.toLocaleTimeString([], opts)} – ${end.toLocaleTimeString([], opts)}`;
  };

  // fetch only “Booked” sessions for this tutor
  const fetchUpcoming = async () => {
    try {
      const res  = await fetch(`/api/appointments/tutor/${tutorId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load');
      // adapt these fields to match your backend shape:
      const formatted = data.map(appt => ({
        id:      appt._id,
        time:    formatTimeRange(appt.startTime),
        student: `${appt.student.firstName} ${appt.student.lastName}`
      }));
      setUpcoming(formatted);
    } catch (err) {
      console.error('Error fetching upcoming sessions:', err);
    }
  };

  // on first render, load profile/stats if you have them, then live-load upcoming
  useEffect(() => {
    // — if you have a profile endpoint, you could fetch and setProfile here —
    fetchUpcoming();
  }, [tutorId]);

  return (
    <>
      <Header tutorMode={true} />

      <div className="tutor-dashboard">
        <aside className="sidebar">
          <button
            className="appointments-ellipse"
            onClick={() => navigate('/tutor/availability')}
          >
            Appointments
          </button>
          <nav className="sidebar-nav">
            <h4>Welcome, {profile.firstName || 'Tutor'}</h4>
            <ul>
              <li className="nav-link">Profile</li>
              <li className="nav-link">Availability</li>
              <li className="nav-link">Session History</li>
              <li className="nav-link">Payroll</li>
            </ul>
          </nav>
        </aside>

        <main className="tutor-main">
          <section className="cards-row">
            <div className="info-card">
              <h4>Hours Logged</h4>
              <p>{hoursLogged}</p>
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

          <section className="session-section">
            <h3>Upcoming Sessions</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Student</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((s) => (
                  <tr key={s.id}>
                    <td>{s.time}</td>
                    <td>{s.student}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="session-section">
            <h3>Session History</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Student</th>
                </tr>
              </thead>
              <tbody>
                {history.map((s, i) => (
                  <tr key={i}>
                    <td>{s.time}</td>
                    <td>{s.student}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
