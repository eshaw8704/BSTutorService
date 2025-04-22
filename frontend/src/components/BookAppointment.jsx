import React, { useState, useEffect } from 'react';
import "./BookAppointment.css";
import DateTimeSelector from './DateTimeSelector';

export default function BookAppointment() {
  const [subject, setSubject] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null); // now a Date object
  const [appointmentTime, setAppointmentTime] = useState('');
  const [tutor, setTutor] = useState('');
  const [tutors, setTutors] = useState([]);
  const [studentID, setStudentID] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setStudentID(id);

    fetch('http://localhost:5000/api/users/tutors')
      .then(res => res.json())
      .then(data => setTutors(data))
      .catch(err => console.error('Error fetching tutors:', err));
  }, []);

  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !appointmentTime) {
      alert("Please select a date and time.");
      return;
    }

    const [year, month, day] = [
      appointmentDate.getFullYear(),
      String(appointmentDate.getMonth() + 1).padStart(2, '0'),
      String(appointmentDate.getDate()).padStart(2, '0')
    ];

    const time24 = convertTo24Hour(appointmentTime);
    const dateTimeISO = new Date(`${year}-${month}-${day}T${time24}`).toISOString();

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
        setSubject('');
        setAppointmentDate(null);
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

        {/* DateTimeSelector */}
        <DateTimeSelector
          onDateTimeSelect={({ date, time }) => {
            setAppointmentDate(date);
            setAppointmentTime(time);
          }}
        />

        {/* Submit */}
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}
