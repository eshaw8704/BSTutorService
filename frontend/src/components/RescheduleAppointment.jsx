import './RescheduleAppointment.css';
import React, { useEffect, useState } from 'react';
import DateTimeSelector from './DateTimeSelector';

export default function RescheduleAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('/api/appointments/upcoming', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, [token]);

  const handleReschedule = async (newDate, newTime) => {
    try {
      const formattedDate = new Date(newDate); // already a Date object
      const formattedTime = newTime.trim(); // already a formatted string like "03:30 PM"

      const res = await fetch(`/api/appointments/${selectedAppointment._id}/change`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          appointmentDate: formattedDate,
          appointmentTime: formattedTime
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Appointment successfully rescheduled!');
        setSelectedAppointment(null);
        const updated = await fetch('/api/appointments/upcoming', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(await updated.json());
      } else {
        alert(`⚠️ Reschedule failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Reschedule error:', error);
      alert('Error rescheduling');
    }
  };

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.slice(0, 10).split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="appointment-container">
      <h2>Reschedule Appointment</h2>

      {!selectedAppointment ? (
        <>
          {appointments.length === 0 ? (
            <p>No appointments available for rescheduling.</p>
          ) : (
            <ul>
              {appointments.map(apt => (
                <li key={apt._id} style={{ marginBottom: '1rem' }}>
                  <strong>{apt.subject}</strong> on {formatDate(apt.appointmentDate)} at {apt.appointmentTime}
                  <button
                    style={{ marginLeft: '1rem' }}
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    Reschedule
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <p>New date/time for: <strong>{selectedAppointment.subject}</strong></p>
          <DateTimeSelector
            tutorId={selectedAppointment.tutor._id}
            currentAppointmentId={selectedAppointment._id}
            onDateTimeSelect={({ date, time }) => handleReschedule(date, time)}
          />
          <button onClick={() => setSelectedAppointment(null)} style={{ marginTop: '1rem' }}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
