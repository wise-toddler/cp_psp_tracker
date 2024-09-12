import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../styles/AdminLogin.css';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (!process.env.REACT_APP_ADMIN_PASSWORD) {
      console.error('Admin password is not set in environment variables');
      setError('Server configuration error. Please contact the administrator.');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (!adminPassword) {
      setError('Server configuration error. Please contact the administrator.');
      return;
    }

    if (password === adminPassword) {
      login();
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;