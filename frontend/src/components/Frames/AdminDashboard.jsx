// src/components/Frames/AdminDashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import './AdminDashboard.css';

import AdminPayrollList from './AdminPayrollList';
import AdminPayrollReview from './AdminPayrollReview';
import AdminAppointments from './AdminAppointments';
import AdminUsers from './AdminUsers';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = React.useState('dashboard');
  const [selectedTutor, setSelectedTutor] = React.useState(null);

  // (Optional) If you want a quick logout button here:
  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate('/login');
  // };

  return (
    <DashboardLayout role="admin">
      <main className="admin-main">
        {activeView === 'dashboard' && (
          <>
            <div className="cards-row">
              {/* Your dashboard info cards go here */}
            </div>
            <div className="upcoming-sessions">
              {/* Your upcoming sessions table goes here */}
            </div>
          </>
        )}

        {activeView === 'users' && <AdminUsers />}

        {activeView === 'payroll' && (
          <AdminPayrollList
            onSelect={(tutorId) => {
              setSelectedTutor(tutorId);
              setActiveView('review');
            }}
          />
        )}

        {activeView === 'review' && selectedTutor && (
          <AdminPayrollReview
            tutorId={selectedTutor}
            onBack={() => setActiveView('payroll')}
          />
        )}

        {activeView === 'appointments' && <AdminAppointments />}
      </main>
    </DashboardLayout>
  );
}
