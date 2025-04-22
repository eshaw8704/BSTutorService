import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AppointmentFrame from '../components/AppointmentFrame';

const AppointmentPage = () => {
  // e.g. you might read role from localStorage or context
  const role = localStorage.getItem('role') || 'student';

  return (
    <DashboardLayout role={role}>
      <AppointmentFrame />
    </DashboardLayout>
  );
};

export default AppointmentPage;
