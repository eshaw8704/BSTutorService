import React, { useEffect, useState } from 'react';
import DateTimeSelector from './DateTimeSelector';

export default function RescheduleAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
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

  const handleReschedule = async (newDate, newTime) => {
    const [year, month, day] = [
      newDate.getFullYear(),
      String(newDate.getMonth() + 1).padStart(2, '0'),
      String(newDate.getDate()).padStart(2, '0'),
    ];
    const [time, modifier] = newTime.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') hours = String(parseInt(hours) + 12);
    if (modifier === 'AM' && hours === '12') hours = '00';

    const dateTimeISO = new Date(`${year}-${month}-${day}T${hours}:${minutes}`).toISOString();

    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${selectedAppointment._id}/change`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          appointmentDate: newDate,
          appointmentTime: dateTimeISO }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Appointment successfully rescheduled!');
        setSelectedAppointment(null);
        const updated = await fetch('http://localhost:5000/api/appointments/upcoming', {
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
                  <strong>{apt.subject}</strong> on {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.appointmentTime}
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