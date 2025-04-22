import React, { useState, useEffect } from 'react';
import './Appointment.css';

export default function Appointment() {
  const [subject, setSubject] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [tutor, setTutor] = useState('');
  const [tutors, setTutors] = useState([]);
  const [studentID, setStudentID] = useState('');

  useEffect(() => {
    // 1) load student ID from localStorage
    const id = localStorage.getItem('userId');
    if (id) setStudentID(id);

    // 2) fetch all tutors
    fetch('http://localhost:5000/api/users/tutors')
      .then(res => res.json())
      .then(data => setTutors(data))
      .catch(err => console.error('Error fetching tutors:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // combine date + time into a single ISO string
    const dateTimeISO = new Date(`${appointmentDate}T${appointmentTime}`).toISOString();

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student: studentID,
          tutor,
          subject,
          appointmentTime: dateTimeISO,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment successfully booked!');
        // reset form
        setSubject('');
        setAppointmentDate('');
        setAppointmentTime('');
        setTutor('');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment');
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        {/* Subject */}
        <select
          value={subject}
          onChange={e => setSubject(e.target.value)}
          required
        >
          <option value="">Select Subject</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
          <option value="Programming">Programming</option>
        </select>

        {/* Tutor */}
        <select
          value={tutor}
          onChange={e => setTutor(e.target.value)}
          required
        >
          <option value="">Select Tutor</option>
          {tutors.map(t => (
            <option key={t._id} value={t._id}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          value={appointmentDate}
          onChange={e => setAppointmentDate(e.target.value)}
          required
        />

        {/* Time */}
        <input
          type="time"
          value={appointmentTime}
          onChange={e => setAppointmentTime(e.target.value)}
          required
        />

        {/* Submit */}
        <button type="submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
}
