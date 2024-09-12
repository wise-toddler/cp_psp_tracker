import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CP Tracker
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/students" className="nav-link" onClick={() => setIsOpen(false)}>Students</Link>
          </li>
          <li className="nav-item">
            <Link to="/questions" className="nav-link" onClick={() => setIsOpen(false)}>Questions</Link>
          </li>
          {isAdmin ? (
            <>
              <li className="nav-item">
                <Link to="/admin" className="nav-link" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="logout-button">Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/admin-login" className="nav-link" onClick={() => setIsOpen(false)}>Admin Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);