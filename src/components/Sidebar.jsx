import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarMenu = [
  { label: 'Dashboard', icon: 'bi-bar-chart', to: '/dashboard' },
  { label: 'Profile', icon: 'bi-person', to: '/profile' },
  { label: 'Reviews', icon: 'bi-envelope-open', to: '/reviews' },
  { label: 'My Properties', icon: 'bi-pencil-square', to: '/my-properties' },
  { label: 'My Favorite', icon: 'bi-heart', to: '/favorites' },
  { label: 'Messages', icon: 'bi-chat-dots', to: '/messages' },
  { label: 'Add Property', icon: 'bi-plus-square', to: '/add-property' },
];

export default function Sidebar({ onLogout, user }) {
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <aside className="sidebar-container">
      <div className="sidebar-content">
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-brand">
            <i className="bi bi-house-door-fill text-primary"></i>
            <span className="sidebar-brand-text">Nepal Room Hub</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Main Menu</div>
            <ul className="nav-list">
              {sidebarMenu.map(({ label, icon, to }) => {
                const isActive = location.pathname === to || 
                  (to !== '/dashboard' && location.pathname.startsWith(to + '/'));
                
                return (
                  <li key={to} className="nav-item">
                    <Link
                      to={to}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      <div className="nav-link-content">
                        <div className="nav-icon-container">
                          <i className={`bi ${icon} nav-icon`}></i>
                        </div>
                        <span className="nav-text">{label}</span>
                        {isActive && <div className="nav-indicator"></div>}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Quick Actions
        <div className="quick-actions">
          <Link to="/add-property" className="btn btn-primary quick-action-btn w-100">
            <i className="bi bi-plus-circle me-2"></i>
            Add Property
          </Link>
        </div> */}

        {/* User Card & Logout */}
        <div className="sidebar-footer">
          {user && (
            <div className="user-card mb-3">
              <div className="user-info">
                <div className="user-avatar">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.FULL_NAME || user.full_name || 'User'
                    )}&background=007bff&color=fff`}
                    alt="User Avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=User&background=007bff&color=fff`;
                    }}
                  />
                  <div className="user-status online"></div>
                </div>
                <div className="user-details">
                  <div className="user-name">
                    {user.FULL_NAME || user.full_name || 'User'}
                  </div>
                  <div className="user-role">Property Owner</div>
                </div>
              </div>
              <div className="user-actions">
                <button 
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger"
                  title="Logout"
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            </div>
          )}
          
          {!user && (
            <button 
              onClick={handleLogout}
              className="btn btn-outline-danger w-100"
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
