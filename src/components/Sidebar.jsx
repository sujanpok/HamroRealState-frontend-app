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

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  return (
    <aside
      className="bg-dark text-white d-flex flex-column d-none d-md-flex"
      style={{
        minHeight: '100vh',
        width: 240,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1040,
        borderRight: '1px solid #222',
      }}
    >
      <div className="d-flex flex-column flex-grow-1 p-3">
        <h4 className="fw-bold mb-4">Hamro Real State</h4>
        <ul className="nav nav-pills flex-column mb-auto">
          {sidebarMenu.map((item) => (
            <li className="nav-item mb-2" key={item.label}>
              <Link
                to={item.to}
                className={`nav-link d-flex align-items-center ${
                  location.pathname === item.to
                    ? 'active bg-primary text-white'
                    : 'text-light'
                }`}
                style={{ borderRadius: 6 }}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3">
          <button className="btn btn-outline-light w-100" onClick={onLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
