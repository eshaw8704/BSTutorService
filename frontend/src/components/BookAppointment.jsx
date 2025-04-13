import React, { useState, useEffect } from 'react';
import './Appointment.css';

function Appointment() {
  const [subject, setSubject] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [tutor, setTutor] = useState('');
  const [studentID, setStudentID] = useState('');
  
  useEffect(() => {
//main
/*
   // fetch('http://localhost:5000/api/tutors')
   // .then((res) => res.json())
   // .then((data) => setTutors(data));
liz*/
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
        // Reset the fields after success
        setSubject('');
        setAppointmentTime('');
        setAppointmentDate(null);
        setTutor('');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
//main
        console.error('Error booking appointment:', error);
        alert('Error booking appointment');
/*
          if (error.response && error.response.status === 400) {
            alert("This tutor is already booked at this time. Please choose another time.");
        } else {
            alert("Failed to book appointment. Please try again.");
        }
liz*/
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem' }}>
      <h2>Book Appointment</h2>
//main
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

/*

     // {/* Error and success messages */}
     // {errorMessage && <div className="error-message">{errorMessage}</div>}
     // {successMessage && <div className="success-message">{successMessage}</div>}

     // <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//liz
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
//main
        <select
/*
        <input
          type="text"
          placeholder="Tutor Name"
liz*/
          value={tutor}
          onChange={(e) => setTutor(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
          required
//main
        >
            <option value="">Select Tutor</option>
            <option value="Rumeet Hundal">Rumeet Hundal</option>
            <option value="Mary Nolan">Mary Nolan</option>
            <option value="Liz Hernandez">Liz Hernandez</option>
            <option value="Matthew Quan">Matthew Quan</option>
            <option value="Elijah shaw">Elijah shaw</option>
            <option value="Farrukh Israilov">Farrukh Israilov</option>
        </select>

        {/* Date Picker */}
        <select
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
            required
        >
            <option value="">Select Date</option>
            <option value="03/20/2025">03/20/2025</option>
            <option value="03/21/2025">03/21/2025</option>
            <option value="03/22/2025">03/22/2025</option>
            <option value="03/23/2025">03/23/2025</option>
            <option value="03/24/2025">03/24/2025</option>
            <option value="03/25/2025">03/25/2025</option>
            <option value="03/26/2025">03/26/2025</option>
            <option value="03/27/2025">03/27/2025</option>
            <option value="03/28/2025">03/28/2025</option>
        </select>
/*
        />

        {/* Date Picker */}
      //  <input
       //   type="date"
       //   value={appointmentDate}
         // onChange={(e) => setAppointmentDate(e.target.value)}
        //  style={{ margin: '0.5rem', padding: '0.5rem', width: '300px' }}
       //   required
  //      />
//liz

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