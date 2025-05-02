import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import TutorPayrollPage from './TutorPayrollPage';
import './TutorDashboard.css';
import UpcomingAppointmentsFrame from '../UpcomingAppointments';


export default function TutorDashboard() {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState('overview');
  const [profile, setProfile] = useState({});
  const [hoursLogged, setHoursLogged] = useState(0);
  const [sessionsDone, setSessionsDone] = useState(0);
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);

  const tutorId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const formatTimeRange = (dateString, duration = 60) => {
    const start = new Date(dateString);
    const end = new Date(start.getTime() + duration * 60000);
    const opts = { hour: 'numeric', minute: '2-digit' };
    return `${start.toLocaleTimeString([], opts)} – ${end.toLocaleTimeString([], opts)}`;
  };

  const fetchUpcoming = async () => {
    try {
      const res = await fetch(`/api/appointments/tutor/${tutorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setUpcoming(
        data.map(a => ({
          id: a._id,
          time: `${new Date(a.appointmentDate).toLocaleDateString()} @ ${a.appointmentTime}`,
          student: a.student ? `${a.student.firstName} ${a.student.lastName}` : 'Unknown Student',
          subject: a.subject || 'Unknown Subject'
        }))
      );
      
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  useEffect(() => {
    if (tutorId) fetchUpcoming();
  }, [tutorId]);

  const Overview = () => (
    <>
      <section className="cards-row">
        <div className="info-card"><h4>Hours Logged</h4><p>{hoursLogged}</p></div>
        <div className="info-card"><h4>Sessions Completed</h4><p>{sessionsDone}</p></div>
        <div className="info-card"><h4>Upcoming Sessions</h4><p>{upcoming.length}</p></div>
      </section>

      <section className="session-section">
        <h3>Upcoming Sessions</h3>
        {upcoming.length ? <Table data={upcoming} /> : <p>No upcoming sessions found.</p>}
      </section>

      <section className="session-section">
        <h3>Session History</h3>
        {history.length ? <Table data={history} /> : <p>No session history available.</p>}
      </section>
    </>
  );

  const Table = ({ data }) => (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Student</th>
          <th>Subject</th> {/* Optional: Show subject */}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id || row.time}>
            <td>{row.time}</td>
            <td>{row.student}</td>
            <td>{row.subject}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <Header tutorMode />

      <div className="tutor-dashboard">
        <aside className="sidebar">
          <button
            className="appointments-ellipse"
            onClick={() => setActiveView('overview')}
          >
            Appointments
          </button>

          <nav className="sidebar-nav">
            <h4>Welcome, {profile.firstName || 'Tutor'}</h4>
            <ul>
              <li className="nav-link">Profile</li>
              <li className="nav-link">Availability</li>
              <li className="nav-link">Session History</li>
              <li
                className={`nav-link ${activeView === 'payroll' ? 'active' : ''}`}
                onClick={() => setActiveView('payroll')}
              >
                Payroll
              </li>
            </ul>
          </nav>
        </aside>

        <main className="tutor-main">
          {activeView === 'overview' && <Overview />}
          {activeView === 'payroll' && <TutorPayrollPage />}
        </main>
      </div>
    </>
  );
}
