import React, { useState, useEffect } from 'react';
import './Appointment.css'; // Assuming you already have the styles for the form

function Appointment() {
  const [subject, setSubject] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [tutor, setTutor] = useState('');
  const [studentID, setStudentID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch the student ID from session or JWT (this is just a placeholder)
    setStudentID('student123');
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentID, subject, appointmentTime, appointmentDate, tutor,}),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment successfully booked!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Error booking appointment');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem' }}>
      <h2>Book Appointment</h2>

      {/* Error and success messages */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Subject Selection */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
          required
        >
          <option value="">Select Subject</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
          <option value="Programming">Programming</option>
        </select>

        {/* Tutor Selection */}
        <input
          type="text"
          placeholder="Tutor Name"
          value={tutor}
          onChange={(e) => setTutor(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
          required
        />

        {/* Date Picker */}
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
          required
        />

        {/* Time Selection */}
        <select
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
          required
        >
          <option value="">Select Time</option>
          <option value="08:00 AM">08:00 AM</option>
          <option value="09:30 AM">09:30 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:30 AM">11:30 AM</option>
          <option value="01:00 PM">01:00 PM</option>
          <option value="01:30 PM">01:30 PM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="02:30 PM">02:30 PM</option>
          <option value="03:00 PM">03:00 PM</option>
        </select>

        {/* Submit Button */}
        <button type="submit" style={{ margin: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#6a0dad', color: 'white', borderRadius: '5px' }}>
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default Appointment;