import React, { useEffect, useState } from 'react';
import { useNavigate }              from 'react-router-dom';
import Header                       from './Header';
import './TutorDashboard.css';

export default function TutorDashboard() {
  const navigate = useNavigate();

  const [profile,     setProfile]     = useState({});
  const [hoursLogged, setHoursLogged] = useState(0);
  const [sessionsDone,setSessionsDone]= useState(0);
  const [upcoming,    setUpcoming]    = useState([]);
  const [history,     setHistory]     = useState([]);

  // replace with your real auth / context
  const tutorId = 'CURRENT_TUTOR_ID';

  // Fetch only “Booked” sessions
  const fetchUpcoming = async () => {
    const res = await fetch(`/api/appointments/tutor/${tutorId}`);
    if (res.ok) setUpcoming(await res.json());
  };

  // Fetch only “Completed” sessions, via your admin route (or you can make your own tutor/completed route)
  const fetchCompleted = async () => {
    const res = await fetch(`/api/admin/logged-appointments?tutorId=${tutorId}`);
    if (res.ok) {
      const { appointments } = await res.json();
      setCompleted(appointments);
      // assume 1 hour per session; adjust if you store durations
      setHoursLogged(appointments.length);
    }
  };

  // mark one session completed
  const handleComplete = async (apptId) => {
    await fetch(`/api/appointments/${apptId}/complete`, { method: 'PATCH' });
    // refresh both lists
    fetchUpcoming();
    fetchCompleted();
  };

  // on mount
  useEffect(() => {
     Promise.all([fetchUpcoming(), fetchCompleted()]).then(() => setLoading(false));
  }, []);  

  useEffect(() => {
    // replace with real API calls
    setProfile({
      firstName:    'Tutor',
      lastName:     'Toots',
      subject:      'Math',
      qualifications: 'MSc Mathematics'
    });
    setHoursLogged(  42 );
    setSessionsDone( 18 );
    setUpcoming([
      { time: '10:00 AM – 12:00 PM', student: 'Adam Smith' },
      { time: ' 1:00 PM –  3:00 PM', student: 'Jane Doe'   },
    ]);
    setHistory([
      { time: ' 8:00 AM – 10:00 AM', student: 'Bob Brown'  },
      { time: ' 6:00 PM –  8:00 PM', student: 'Sara Lee'   },
    ]);
  }, []);

  return (
    <>
      {/* same fixed Header */}
      <Header tutorMode={true} />

      <div className="tutor-dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <button
            className="appointments-ellipse"
            onClick={() => navigate('/tutor/availability')}
          >
            Appointments
          </button>
          <nav className="sidebar-nav">
            <h4>Welcome, {profile.firstName}</h4>
            <ul>
              <li>Profile</li>
              <li>Availability</li>
              <li>Session History</li>
              <li>Payroll</li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="tutor-main">
          {/* Stats cards */}
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

          {/* Upcoming Sessions */}
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
                {upcoming.map((s,i) => (
                  <tr key={i}>
                    <td>{s.time}</td>
                    <td>{s.student}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Session History */}
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
                {history.map((s,i) => (
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
