import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddStudent from './AddStudent';
import AddQuestion from './AddQuestion';
import ShowTasks from './ShowTasks';
import './../../styles/AdminDashboard.css';
import { useAuth } from '../context/AuthContext';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
          <button onClick={() => setActiveTab('tasks')}>Show Tasks</button>
        </div>
        <div className="tab-content">
          {activeTab === 'students' && <AddStudent />}
          {activeTab === 'questions' && <AddQuestion />}
          {activeTab === 'tasks' && <ShowTasks />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;