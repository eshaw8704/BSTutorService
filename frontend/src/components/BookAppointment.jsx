import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import './BookAppointment.css';

export default function BookAppointment() {
  const [subject, setSubject] = useState('');
  const [tutor, setTutor]     = useState('');
  const [date, setDate]       = useState('');
  const [time, setTime]       = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (subject && tutor && date && time) {
      setConfirmed(true);
    } else {
      alert('Please fill all fields before confirming.');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!confirmed) return;
    // TODO: swap out this alert for your real API call
    alert(`Booked:\n${subject} with ${tutor}\non ${date} at ${time}`);
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject</label>
          <select value={subject} onChange={e => setSubject(e.target.value)}>
            <option value="">Select Subject</option>
            <option>Math</option>
            <option>Physics</option>
            <option>English</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tutor</label>
          <select value={tutor} onChange={e => setTutor(e.target.value)}>
            <option value="">Select Tutor</option>
            <option>Tutor Toots</option>
            <option>Tutor Jane</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <select value={time} onChange={e => setTime(e.target.value)}>
            <option value="">Select Time</option>
            <option>09:00 AM</option>
            <option>01:00 PM</option>
            <option>03:00 PM</option>
          </select>
        </div>

        <button
          type="button"
          className={`confirm-strip${confirmed ? ' confirmed' : ''}`}
          onClick={handleConfirm}
        >
          {confirmed ? (
            <>
              <FaCheck className="check-icon" />
              Selection Confirmed
            </>
          ) : (
            'Confirm Selection'
          )}
        </button>

        <button
          type="submit"
          className="submit-btn"
          disabled={!confirmed}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
