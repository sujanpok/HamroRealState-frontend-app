// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ user }) {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto shadow-sm">
      &copy; {new Date().getFullYear()} <span className="fw-bold">Hamro Real State</span>. All rights reserved.
      {user && (
        <div className="mt-2">
          {/* ログイン時のみフッターに表示されるボタングループ */}
          <Link className="btn btn-link text-white" to="/about">About</Link>
          <Link className="btn btn-link text-white" to="/contact">Contact</Link>
        </div>
      )}
    </footer>
  );
}
