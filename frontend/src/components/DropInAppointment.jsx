
import React from 'react';
import DashboardLayout from '../DashboardLayout';
import BookAppointment from '../components/BookAppointment';
import './DropInAppointmentPage.css';
import DropInAppointments from '../components/DropInAppointment';

  export default function DropInAppointments() {
    const [slots, setSlots] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');
  
    useEffect(() => {
      async function loadSlots() {
        if (!token) return;
        try {
          const res = await fetch('/api/appointments/dropin', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const data = await res.json();
          setSlots(data);
        } catch (err) {
          console.error('Error loading drop-in slots:', err);
          setErrorMessage('Unable to load drop-in slots.');
        }
      }
      loadSlots();
    }, [token]);
  
    const handleJoin = async (slotId) => {
      try {
        const res = await fetch(`/api/appointments/dropin/${slotId}/join`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        // remove the joined slot from the list
        setSlots(prev => prev.filter(s => s._id !== slotId));
      } catch (err) {
        console.error('Error joining slot:', err);
        setErrorMessage('Could not join that slot. Try again.');
      }
    };
  
    return (
      <div className="dropin-appointments">
        <h2>Drop-In Appointments</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {slots.length === 0 ? (
          <p>No drop-in slots available right now.</p>
        ) : (
          <ul>
            {slots.map(slot => {
              const dt = new Date(slot.dateTime);
              const date = dt.toLocaleDateString();
              const time = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <li key={slot._id}>
                  <div className="slot-info">
                    <span className="slot-datetime">{date} @ {time}</span>
                    <span className="slot-tutor">with {slot.tutorName}</span>
                  </div>
                  <button onClick={() => handleJoin(slot._id)}>
                    Join
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
