import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';     // ← new
import './AdminDashboard.css';
import greenLogo from '../../assets/greenBS.png';
import AdminPayrollList   from './AdminPayrollList';
import AdminPayrollReview from './AdminPayrollReview';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView,    setActiveView]    = React.useState('dashboard');
  const [selectedTutor, setSelectedTutor] = React.useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <DashboardLayout role="admin">                {/* ← wrap in shared layout */}
      <div className="admin-dashboard-layout">
        {/* you can still keep your header/buttons if you want,
            but DashboardLayout already renders the header/sidebar */}
        <main className="admin-main">
          {activeView === 'dashboard' && (
            <>
              <div className="cards-row">
                {/* … your info cards … */}
              </div>
              <div className="upcoming-sessions">
                {/* … your sessions table … */}
              </div>
            </>
          )}

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
        </main>
      </div>
    </DashboardLayout>
  );
}
