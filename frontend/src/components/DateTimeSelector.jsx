// src/components/DateTimeSelector.jsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimeSelector.css";

const timeSlots = [
  "08:00 AM", "09:30 AM", "10:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM"
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

export default function DateTimeSelector({ onDateTimeSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const isSameLocalDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isToday = selectedDate && isSameLocalDay(selectedDate, now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const availableTimeSlots = timeSlots.filter((t) =>
    isToday ? slotToMinutes(t) >= nowMinutes : true
  );

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

      <p className="confirm-text">
        Almost there! Please confirm your selection.
      </p>

      {confirmed && (
        <p className="confirmation-msg">✅ Time confirmed!</p>
      )}
    </div>
  );
}
