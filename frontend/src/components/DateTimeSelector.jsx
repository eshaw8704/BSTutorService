import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimeSelector.css";

// Time slots for the dropdown — exactly matches your schema enum
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
  let [hours, minutes] = time.split(":");
  if (modifier === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }
  return `${hours}:${minutes}`;
};

export default function DateTimeSelector({ onDateTimeSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      onDateTimeSelect({
        date: selectedDate,
        time: convertTo24Hour(selectedTime)
      });
      setConfirmed(true);
    } else {
      alert("Please select both date and time");
    }
  };

  return (
    <div className="date-time-container">
      <h2>Select Date & Time</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setConfirmed(false);
        }}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()}
        className="date-picker"
      />

      <select
        value={selectedTime}
        onChange={(e) => {
          setSelectedTime(e.target.value);
          setConfirmed(false);
        }}
      >
        <option value="">Select Time</option>
        {timeSlots.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <button type="button" onClick={handleSubmit}>
        Confirm
      </button>

      {confirmed && <p className="confirmation-msg">✅ Time confirmed!</p>}
    </div>
  );
}
