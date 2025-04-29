import React, { useState, useEffect } from 'react';
import "./BookAppointment.css";
import DateTimeSelector from './DateTimeSelector';

export default function AdminAppointments() {
  // List and form toggle
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [subject, setSubject] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [tutor, setTutor] = useState('');
  const [student, setStudent] = useState('');

  // Dropdown data
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch existing appointments
    fetch('/api/admin/appointments', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));

    // Fetch students and tutors for form
    fetch('/api/users/students', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error('Error fetching students:', err));

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
    setErrorMessage('');
    setSuccessMessage('');
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

    try {
      const response = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ student, tutor, subject, appointmentTime: dateTimeISO })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Appointment created successfully!');
        setSubject('');
        setAppointmentDate(null);
        setAppointmentTime('');
        setTutor('');
        setStudent('');
        setShowConfirmation(true);
        // refresh list
        setAppointments(prev => [...prev, data]);
      } else {
        setErrorMessage(data.message || 'Error creating appointment');
      }
    } catch (err) {
      console.error('Error creating appointment:', err);
      setErrorMessage('Error creating appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Admin: Appointments</h2>

      {!showForm ? (
        <>
          <button className="new-btn" onClick={() => setShowForm(true)}>
            + New Appointment
          </button>

          {appointments.length ? (
            <ul className="appointment-list">
              {appointments.map(appt => (
                <li key={appt._id} className="appointment-item">
                  <strong>{appt.subject}</strong> — {new Date(appt.appointmentTime).toLocaleString()}
                  <br />
                  Student: {appt.studentName} | Tutor: {appt.tutorName}
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments found.</p>
          )}
        </>
      ) : (
        <>
          <button className="back-btn" onClick={() => setShowForm(false)}>
            &larr; Back to List
          </button>
          <form onSubmit={handleSubmit} className="appointment-form">
            <select value={subject} onChange={e => setSubject(e.target.value)} required>
              <option value="">Select Subject</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Programming">Programming</option>
            </select>

            <select value={student} onChange={e => setStudent(e.target.value)} required>
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
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
              {isLoading ? "Creating..." : "Create Appointment"}
            </button>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>

          {showConfirmation && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="modal-close"
                  onClick={() => setShowConfirmation(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2>Appointment Created</h2>
                <p>An email notification was sent to the student and tutor.</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}