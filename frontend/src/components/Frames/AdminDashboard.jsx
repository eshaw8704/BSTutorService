// src/components/Frames/AdminDashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import './AdminDashboard.css';
import TrafficStats from '.././TrafficStats';           // ← FIXED import path
import AdminUsers from './AdminUsers';
import AdminPayrollList from './AdminPayrollList';
import AdminPayrollReview from './AdminPayrollReview';
import AdminAppointments from './AdminAppointments';

export default function AdminDashboard() {
  const [activeView, setActiveView]       = React.useState('dashboard');
  const [selectedTutor, setSelectedTutor] = React.useState(null);
  const navigate = useNavigate();

  return (
    <DashboardLayout role="admin">
      <main className="admin-main">
        {activeView === 'dashboard' && (
          <>
            {/* ─── Top “cards” row ─── */}
            <div className="cards-row">
              <TrafficStats />            {/* now shows your line chart */}
            </div>
            {/* ─── Other dashboard content ─── */}
            <div className="upcoming-sessions">
              {/* …your existing upcoming sessions table… */}
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
