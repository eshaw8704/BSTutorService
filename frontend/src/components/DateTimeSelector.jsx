import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DateTimeSelector.css';


// For time selection
const timeSlots = [
  "08:00 AM", "09:30 AM", "10:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM"
];

const DateTimeSelector = ({ onDateTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      onDateTimeSelect({ date: selectedDate, time: selectedTime });
    } else {
      alert("Please select both date and time");
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl w-80">
      <h2 className="text-lg font-semibold mb-2">Select Date & Time</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        className="w-full p-2 border rounded-md"
        minDate={new Date()}
      />
      <select
        className="w-full mt-2 p-2 border rounded-md"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="">Select Time</option>
        {timeSlots.map((time, index) => (
          <option key={index} value={time}>{time}</option>
        ))}
      </select>
      <button
        className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </div>
  );
};

export default DateTimeSelector;
