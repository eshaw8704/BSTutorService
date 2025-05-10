import React, { useEffect, useState } from 'react';

export default function CancelAppointment() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/appointments/upcoming', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, [token]);

  const handleCancel = async (id) => {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('Appointment canceled successfully');
        setAppointments(prev => prev.filter(apt => apt._id !== id));
      } else {
        alert('Error canceling appointment');
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      alert('Error canceling appointment');
    }
  };

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.slice(0, 10).split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="appointment-container">
      <h2>Cancel Appointment</h2>
      {appointments.length === 0 ? (
        <p>No appointments to cancel.</p>
      ) : (
        <ul>
          {appointments.map(apt => (
            <li key={apt._id} style={{ marginBottom: '1rem' }}>
              <strong>{apt.subject}</strong> on {formatDate(apt.appointmentDate)} at {apt.appointmentTime}
              <button style={{ marginLeft: '1rem' }} onClick={() => handleCancel(apt._id)}>
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
