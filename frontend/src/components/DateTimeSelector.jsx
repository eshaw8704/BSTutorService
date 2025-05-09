import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimeSelector.css";

const timeSlots = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM"
];

const convertTo24Hour = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
};

const slotToMinutes = (slot) => {
  const { hours, minutes } = convertTo24Hour(slot);
  return hours * 60 + minutes;
};

export default function DateTimeSelector({ onDateTimeSelect, tutorId, excludeApptId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    if (!selectedDate || !tutorId) return;
    const dateStr = selectedDate.toISOString().split("T")[0];

    fetch(`/api/appointments/tutor/${tutorId}/booked-times?date=${dateStr}&exclude=${excludeApptId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(booked => {
        const bookedArray = Array.isArray(booked) ? booked : [];

        const now = new Date();
        const isToday = selectedDate.toDateString() === now.toDateString();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        const filtered = timeSlots.filter(slot => {
          const notBooked = !bookedArray.includes(slot);
          const notPast = !isToday || slotToMinutes(slot) >= nowMinutes;
          return notBooked && notPast;
        });

        setAvailableTimeSlots(filtered);
      })
      .catch(err => {
        console.error("Failed to load booked times:", err);
        setAvailableTimeSlots([]);
      });
  }, [selectedDate, tutorId, excludeApptId]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }
    onDateTimeSelect({ date: selectedDate, time: selectedTime });
    setConfirmed(true);
  };

  return (
    <div className="date-time-selector">
      <h3>Select Date & Time</h3>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setSelectedTime("");
          setConfirmed(false);
        }}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()}
        className="date-input"
        placeholderText="Select a date"
        popperPlacement="bottom"
      />

      <select
        value={selectedTime}
        onChange={(e) => {
          setSelectedTime(e.target.value);
          setConfirmed(false);
        }}
        className="time-dropdown"
      >
        <option value="">Select Time</option>
        {availableTimeSlots.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <button className="confirm-button" type="button" onClick={handleConfirm}>
        Confirm Selection
      </button>

      <p className="confirm-text">Almost there! Please confirm your selection.</p>
      {confirmed && <p className="confirmation-msg">✅ Time confirmed!</p>}
    </div>
  );
}
