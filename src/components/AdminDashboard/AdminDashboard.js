import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddStudent from './AddStudent';
import AddQuestion from './AddQuestion';
import './../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <div className="tab-buttons">
          <button onClick={() => setActiveTab('students')}>Add Student</button>
          <button onClick={() => setActiveTab('questions')}>Add Question</button>
        </div>
        <div className="tab-content">
          {activeTab === 'students' ? <AddStudent /> : <AddQuestion />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;