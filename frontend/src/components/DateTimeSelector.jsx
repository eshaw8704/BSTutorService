// src/components/DateTimeSelector.jsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimeSelector.css";
//try to make this component a 
const timeSlots = [
  "08:00 AM",
  "09:30 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
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
  const [selectedTime, setSelectedTime]   = useState("");
  const [confirmed, setConfirmed]         = useState(false);
  const [now, setNow]                     = useState(new Date());

  // keep “now” updated every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // helper to check local day equality
  const isSameLocalDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isToday = selectedDate && isSameLocalDay(selectedDate, now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // **use >= here** so that at 3:00 PM the 03:00 PM slot still appears
  const availableTimeSlots = timeSlots.filter(slot =>
    isToday
      ? slotToMinutes(slot) >= nowMinutes
      : true
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
    <div className="date-time-container">
      <h2>Select Date & Time</h2>

      <DatePicker
        selected={selectedDate}
        onChange={date => {
          setSelectedDate(date);
          setSelectedTime("");
          setConfirmed(false);
        }}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()}
        className="date-picker"
      />

      <select
        value={selectedTime}
        onChange={e => {
          setSelectedTime(e.target.value);
          setConfirmed(false);
        }}
      >
        <option value="">Select Time</option>
        {availableTimeSlots.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <button type="button" onClick={handleConfirm}>
        Confirm
      </button>
      //not needed there is already confirm button for appointment
      {confirmed && <p className="confirmation-msg">✅ Time confirmed!</p>}
    </div>
  );
}
