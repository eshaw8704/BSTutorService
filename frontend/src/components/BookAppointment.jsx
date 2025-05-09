import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import './BookAppointment.css';

const ALL_TIME_SLOTS = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM"
];

export default function BookAppointment() {
  const [subject, setSubject] = useState('');
  const [tutor, setTutor] = useState('');
  const [tutors, setTutors] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const token = localStorage.getItem('token');

  // ✅ Fetch tutors
  useEffect(() => {
    fetch('/api/users/tutors', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tutors');
        return res.json();
      })
      .then(setTutors)
      .catch(err => console.error('Tutor fetch error:', err));
  }, [token]);

  // ✅ Fetch available time slots
  useEffect(() => {
    if (!tutor || !date) {
      setAvailableTimes([]);
      return;
    }

    fetch(`/api/appointments/tutor/${tutor}/booked-times`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load booked times');
        return res.json();
      })
      .then(booked => {
        const bookedTimes = booked
          .filter(b => b.date === date)
          .map(b => b.time);

        const free = ALL_TIME_SLOTS.filter(t => !bookedTimes.includes(t));
        setAvailableTimes(free);
      })
      .catch(err => {
        console.error('Availability error:', err);
        setAvailableTimes([]);
      });
  }, [tutor, date, token]);

  const handleConfirm = () => {
    if (subject && tutor && date && time) {
      setConfirmed(true);
    } else {
      alert('❌ Please fill all fields before confirming.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmed) return;

    try {
      const student = localStorage.getItem('userId'); // ✅ Explicitly pull student ID

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject,
          tutor,
          student,
          appointmentDate: date,
          appointmentTime: time
        })
      });

      if (!res.ok) {
        const contentType = res.headers.get("Content-Type");
        let errorMessage = `Booking failed: ${res.statusText}`;

        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = `Booking failed: ${errorData.message || res.statusText}`;
        } else {
          const text = await res.text();
          if (text) errorMessage = `Booking failed: ${text}`;
        }

        alert(errorMessage);
        return;
      }

      await res.json();
      alert('✅ Appointment booked!');

      // Reset form
      setSubject('');
      setTutor('');
      setDate('');
      setTime('');
      setAvailableTimes([]);
      setConfirmed(false);
    } catch (err) {
      console.error('❌ Booking error:', err);
      alert('Error booking appointment.');
    }
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
            <option>History</option>
            <option>Programming</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tutor</label>
          <select value={tutor} onChange={e => {
            setTutor(e.target.value);
            setConfirmed(false);
            setTime('');
          }}>
            <option value="">Select Tutor</option>
            {tutors.map(t => (
              <option key={t._id} value={t._id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={e => {
              setDate(e.target.value);
              setTime('');
              setConfirmed(false);
            }}
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <select
            value={time}
            onChange={e => {
              setTime(e.target.value);
              setConfirmed(false);
            }}
            disabled={!availableTimes.length}
          >
            <option value="">Select Time</option>
            {availableTimes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
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
