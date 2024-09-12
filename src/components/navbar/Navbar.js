import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CP Tracker
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/students" className="nav-link">Students</Link>
          </li>
          <li className="nav-item">
            <Link to="/questions" className="nav-link">Questions</Link>
          </li>
          {isAdmin ? (
            <>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/admin-login" className="nav-link">Admin Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);