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
            {appointments.map(appt => {
              const dateObj = new Date(appt.appointmentTime);
              const date = dateObj.toLocaleDateString();
              const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <tr key={appt._id} className="appointment-item">
                  <td>{appt.subject}</td>
                  <td>{appt.studentName}</td>
                  <td>{appt.tutorName}</td>
                  <td>{appt.appointmentDate || 'TBD'}</td>
                  <td>{appt.appointmentTime || 'TBD'}</td>
                  <td>
                    <button className="cancel-btn">
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No appointments have been booked yet.</p>
      )}
    </div>
  );
}