import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import { useTheme } from '../App';

export default function Header({ user, onLogout, onAuthOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Debug: Track user prop changes
  useEffect(() => {
    console.log('🔍 Header: User prop received:', user);
    console.log('🔍 Header: User exists:', !!user);
    if (user) {
      console.log('🔍 Header: User details:', {
        name: user.FULL_NAME || user.full_name,
        email: user.email,
        id: user.id
      });
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('🔍 Header: Logout button clicked');
    removeToken();
    onLogout && onLogout();
    navigate('/');
  };

  const handleAuthOpen = (mode) => {
    console.log('🔍 Header: Opening auth modal:', mode);
    onAuthOpen(mode);
  };

  console.log('🔍 Header: Rendering - showing user menu:', !!user);

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand brand-logo" to="/">
          <i className="bi bi-house-heart-fill text-primary me-2"></i>
          <span className="fw-bold">Nepal Room Hub</span>
        </Link>

        {/* Theme Toggle */}
        <button 
          className="theme-toggle-btn me-3"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'} transition-all`}></i>
        </button>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'} fs-4 transition-transform`}></i>
        </button>

        {/* Navigation */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className="nav-link nav-link-hover" 
                to="/" 
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-house me-1"></i>Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className="nav-link nav-link-hover" 
                to="/properties" 
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-grid-3x3-gap me-1"></i>All Rooms
              </Link>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link nav-link-hover" 
                    to="/about" 
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="bi bi-info-circle me-1"></i>About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link nav-link-hover" 
                    to="/contact" 
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="bi bi-telephone me-1"></i>Contact
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link nav-link-hover" 
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="bi bi-speedometer2 me-1"></i>Dashboard
                  </Link>
                </li>
                
                <li className="nav-item dropdown" ref={dropdownRef}>
                  <button
                    className="nav-link dropdown-toggle border-0 bg-transparent user-dropdown"
                    onClick={() => setDropdownOpen(v => !v)}
                    aria-expanded={dropdownOpen}
                  >
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.FULL_NAME || user.full_name || 'User')}`} 
                      alt="Profile"
                      className="user-avatar me-2"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.FULL_NAME || user.full_name || 'User')}`;
                      }}
                    />
                    <span className="d-none d-md-inline">{user.FULL_NAME || user.full_name || 'User'}</span>
                  </button>
                  
                  <ul className={`dropdown-menu dropdown-menu-end animated-dropdown ${dropdownOpen ? 'show' : ''}`}>
                    <li>
                      <Link className="dropdown-item dropdown-item-hover" to="/my-properties" onClick={() => setDropdownOpen(false)}>
                        <i className="bi bi-house-gear me-2"></i>My Rooms
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item dropdown-item-hover" to="/messages" onClick={() => setDropdownOpen(false)}>
                        <i className="bi bi-chat-dots me-2"></i>Messages
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item dropdown-item-hover" to="/favorites" onClick={() => setDropdownOpen(false)}>
                        <i className="bi bi-heart me-2"></i>Favorites
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item dropdown-item-hover" to="/reviews" onClick={() => setDropdownOpen(false)}>
                        <i className="bi bi-star me-2"></i>Reviews
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item dropdown-item-hover" to="/profile" onClick={() => setDropdownOpen(false)}>
                        <i className="bi bi-person me-2"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item dropdown-item-hover" to="/add-property" onClick={() => setDropdownOpen(false)}>
                        <i className="bi bi-plus-square me-2"></i>Add Room
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item dropdown-item-hover text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-primary btn-animated px-4"
                  onClick={() => handleAuthOpen('login')}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Join Now
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
