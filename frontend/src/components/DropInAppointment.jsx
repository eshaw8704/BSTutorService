
import React from 'react';
import DashboardLayout from '../DashboardLayout';
import BookAppointment from '../components/BookAppointment';
import './DropInAppointmentPage.css';

export default function BookAppointmentPage() {
  return (
    <DashboardLayout role="student">
      <div className="book-appointment-page">
        <h1>Schedule a Session</h1>
        <BookAppointment />
      </div>
    </DashboardLayout>
  );
}
