import React, { useState, useEffect } from 'react';
import "./BookAppointment.css";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    // Fetch all booked appointments
    fetch('/api/admin/appointments', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, [token]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('DELETE status', res.status);

      if (res.status === 204) {
        // 2) Remove from state so the table updates
        setAppointments(prev => prev.filter(a => a._id !== id));
      } else {
        console.error('Failed to cancel appointment', await res.json());
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Booked Appointments</h2>

      {appointments.length > 0 ? (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Student</th>
              <th>Tutor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt._id} className="appointment-item">
                <td>{appt.subject}</td>
                <td>{appt.studentName}</td>
                <td>{appt.tutorName}</td>
                <td>
                  {appt.appointmentDate
                    ? new Date(appt.appointmentDate).toLocaleDateString('en-US'): 'TBD'}
                </td>
                <td>
                  {appt.appointmentTime || 'TBD'}
                </td>
                <td>
                  {/* 3) Wire the button to handleCancel */}
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(appt._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments have been booked yet.</p>
      )}
    </div>
  );
}