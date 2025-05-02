import React, { useEffect, useState } from 'react';
import './AdminUsers.css'; // Create this if you don’t have it yet

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error(data.message || 'Invalid user data');
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    }
  };

  const startEdit = (user) => {
    setEditUserId(user._id);
    setFormData({ ...user });
    setStatus('');
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveUser = async () => {
    try {
      const res = await fetch(`/api/admin/users/${editUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      setStatus('✅ User updated');
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setStatus(`❌ ${err.message}`);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');

      setStatus('✅ User deleted');
      fetchUsers();
    } catch (err) {
      console.error(err);
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="page-wrapper">
      <h2>All Users</h2>
      {error && <p className="status-msg error">{error}</p>}
      {status && <p className="status-msg">{status}</p>}

      <table className="users-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            editUserId === user._id ? (
              <tr key={user._id}>
                <td>
                  <select name="role" value={formData.role} onChange={handleChange}>
                    <option>student</option>
                    <option>tutor</option>
                    <option>admin</option>
                  </select>
                </td>
                <td><input name="firstName" value={formData.firstName} onChange={handleChange} /></td>
                <td><input name="lastName" value={formData.lastName} onChange={handleChange} /></td>
                <td><input name="email" value={formData.email} onChange={handleChange} /></td>
                <td>
                  <button onClick={saveUser}>Save</button>
                  <button onClick={cancelEdit} className="cancel">Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={user._id}>
                <td>{user.role}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => startEdit(user)}>Edit</button>
                  <button onClick={() => deleteUser(user._id)} className="delete">Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
