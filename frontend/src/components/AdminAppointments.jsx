import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AdminAppointments() {
  const [appts, setAppts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all appointments
  useEffect(() => {
    setLoading(true);
    axios.get('/api/admin/appointments')
      .then(res => setAppts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (id, date, time) => {
    axios.put(`/api/admin/appointments/${id}`, { appointmentDate: date, appointmentTime: time })
      .then(res => {
        setAppts(a => a.map(x => x._id === id ? res.data : x));
        setEditing(null);
      })
      .catch(err => console.error(err));
  };

  const handleCancel = id => {
    axios.put(`/api/admin/appointments/${id}/cancel`)
      .then(res => setAppts(a => a.map(x => x._id === id ? res.data : x)))
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Appointments Admin</h2>
      <table>
        <thead>
          <tr><th>Student</th><th>Tutor</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {appts.map(a => (
            <tr key={a._id}>
              <td>{a.student.firstName} {a.student.lastName}</td>
              <td>{a.tutor.firstName} {a.tutor.lastName}</td>
              <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
              <td>{a.appointmentTime}</td>
              <td>{a.status}</td>
              <td>
                <button onClick={() => setEditing(a)}>Edit</button>
                {a.status !== 'Cancelled' && <button onClick={() => handleCancel(a._id)}>Cancel</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="modal">
          <h3>Reschedule</h3>
          <DatePicker
            selected={new Date(editing.appointmentDate)}
            onChange={date => setEditing(e => ({ ...e, appointmentDate: date }))}
          />
          <DatePicker
            selected={new Date("1970-01-01T" + editing.appointmentTime)}
            onChange={time => setEditing(e => ({ ...e, appointmentTime: time.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) }))}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="h:mm aa"
          />
          <button onClick={() => handleSave(editing._id, editing.appointmentDate, editing.appointmentTime)}>Save</button>
          <button onClick={() => setEditing(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}