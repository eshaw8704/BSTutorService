import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DateTimeSelector.css';

const timeSlots = [
  "08:00 AM", "09:30 AM", "10:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM"
];

const DateTimeSelector = ({ onDateTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      setError(""); // clear error
      onDateTimeSelect({ date: selectedDate, time: selectedTime });
    } else {
      setError("Please select both date and time.");
    }
  };

  return (
    <div className="date-time-container">
      <h2>Select Date & Time</h2>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        className="date-picker"
        minDate={new Date()}
        placeholderText="Choose a date"
      />
      <select
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="">Select Time</option>
        {timeSlots.map((time, index) => (
          <option key={index} value={time}>{time}</option>
        ))}
      </select>
      <button type="button" onClick={handleSubmit}>Confirm</button>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DateTimeSelector;
