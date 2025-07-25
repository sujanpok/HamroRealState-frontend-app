import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export default function Header({ user, onLogout, onAuthOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeToken();
    onLogout && onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Hamro Real State</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {/* Always visible links */}
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
                        {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              </li>
            </>
                        )}
            {/* User dropdown or Register/Login */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item dropdown" ref={dropdownRef}>
                  <button
                    className="btn btn-light d-flex align-items-center border-0 ms-2"
                    style={{ minWidth: 0 }}
                    onClick={() => setDropdownOpen((v) => !v)}
                    aria-expanded={dropdownOpen}
                  >
                    <img
                      src={user.profile_image || user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: 36, height: 36, objectFit: 'cover', marginRight: 8 }}
                    />
                    <span className="fw-semibold d-none d-md-inline">{user.FULL_NAME || user.full_name || 'User'}</span>
                    <i className="bi bi-caret-down-fill ms-2"></i>
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-menu-end shadow${dropdownOpen ? ' show' : ''}`}
                    style={{ minWidth: 210, marginTop: 8 }}
                  >
                    <li>
                      <Link className="dropdown-item" to="/my-properties">
                        <i className="bi bi-bar-chart me-2"></i> My Properties
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/messages">
                        <i className="bi bi-chat-dots me-2"></i> Message
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/favorites">
                        <i className="bi bi-heart me-2"></i> My Favorites
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/reviews">
                        <i className="bi bi-envelope-open me-2"></i> Reviews
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/add-property">
                        <i className="bi bi-plus-square me-2"></i> Add Property
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-warning ms-2"
                    onClick={() => onAuthOpen('login')}
                  >
                    Register / Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
