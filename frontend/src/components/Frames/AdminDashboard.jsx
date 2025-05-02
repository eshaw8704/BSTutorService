// src/components/Frames/AdminDashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import './AdminDashboard.css';

// ← Import your new traffic component
import TrafficStats        from '../TrafficStats';
import AdminUsers          from './AdminUsers';
import AdminPayrollList    from './AdminPayrollList';
import AdminPayrollReview  from './AdminPayrollReview';
import AdminAppointments   from './AdminAppointments';
import DashboardLayout from "../DashboardLayout";
import greenLogo from '../../assets/greenBS.png';

// This component represents the admin dashboard layout
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView]       = React.useState('dashboard');
  const [selectedTutor, setSelectedTutor] = React.useState(null);

  return (
    <DashboardLayout role="admin">
      <main className="admin-main">
        {activeView === 'dashboard' && (
          <>
            {/* ─── Top “cards” row ─── */}
            <div className="cards-row">
              <TrafficStats />
              {/* Add more cards here if you like */}
            </div>

            {/* ─── Upcoming sessions / whatever else ─── */}
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
