import React, { useState, useEffect } from 'react';
import "./BookAppointment.css";
import DateTimeSelector from './DateTimeSelector';

export default function BookAppointment() {
  const [subject, setSubject] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [tutor, setTutor] = useState('');
  const [tutors, setTutors] = useState([]);
  const [studentID, setStudentID] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token'); // JWT

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setStudentID(id);
    }

    fetch('/api/users/tutors', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setTutors(data))
      .catch(err => console.error('Error fetching tutors:', err));
  }, [token]);

  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") hours = parseInt(hours, 10) + 12;
    if (modifier === "AM" && hours === "12") hours = "00";
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true);

    if (!appointmentDate || !appointmentTime) {
      setErrorMessage("Please select both date and time.");
      setIsLoading(false);
      return;
    }

    const [year, month, day] = [
      appointmentDate.getFullYear(),
      String(appointmentDate.getMonth() + 1).padStart(2, '0'),
      String(appointmentDate.getDate()).padStart(2, '0')
    ];
    const time24 = convertTo24Hour(appointmentTime);
    const dateTimeISO = new Date(`${year}-${month}-${day}T${time24}`).toISOString();

    console.log("Sending Appointment Data:", {
      student: studentID,
      tutor,
      subject,
      appointmentTime: dateTimeISO,
      appointmentDate: appointmentDate,
    });

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          student: studentID,
          tutor,
          subject,
          appointmentTime: dateTimeISO,
          appointmentDate: appointmentDate
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Appointment successfully booked!');
        setSubject('');
        setAppointmentDate(null);
        setAppointmentTime('');
        setTutor('');
      } else {
        setErrorMessage(data.message || 'Error booking appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage('Error booking appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <select value={subject} onChange={e => setSubject(e.target.value)} required>
          <option value="">Select Subject</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
          <option value="Programming">Programming</option>
        </select>

        <select value={tutor} onChange={e => setTutor(e.target.value)} required>
          <option value="">Select Tutor</option>
          {tutors.map(t => (
            <option key={t._id} value={t._id}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>

        <DateTimeSelector
          onDateTimeSelect={({ date, time }) => {
            setAppointmentDate(date);
            setAppointmentTime(time);
          }}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Booking..." : "Book Appointment"}
        </button>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}
