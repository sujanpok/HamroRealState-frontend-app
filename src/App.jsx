import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Modal from './components/Modal';
import RegisterLogin from './pages/RegisterLogin'; // ← NEW!!
import { getToken } from './utils/auth';
import PropertyDetails from './pages/PropertyDetails';
import AllProperties from './pages/AllProperties';
import Profile from './pages/Profile';
import Messenger from './pages/Messenger';
import UploadProperty from './pages/UploadProperty';
import MyFavorites from './pages/Favorites';
import MyProperties from './pages/MyProperties';
import Reviews from './pages/Reviews';

const dashboardRoutes = [
  '/dashboard', '/profile', '/reviews', '/my-properties', '/favorites', '/messages', '/add-property'
];

function isDashboardPage(pathname) {
  return dashboardRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
}

export default function App() {
  const [modal, setModal] = useState(null); // 'login' | 'signup' | null
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user profile if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await fetch('https://api.hamrorealstate.store/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.status === 200 && data.profile) {
          setUser(data.profile);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    fetchProfile();
  }, [modal, location.pathname]);

  const handleAuthSuccess = (profile) => {
    setUser(profile);
    setModal(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  // Sidebar only for logged-in users AND dashboard-related pages
  const showSidebar = user && isDashboardPage(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        user={user}
        onLogout={handleLogout}
        onAuthOpen={mode => setModal(mode)} // mode: 'login' or 'signup'
      />
      <div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>
        {showSidebar && <Sidebar onLogout={handleLogout} />}
        <main
          className="flex-grow-1"
          style={{
            minHeight: 0,
            transition: 'margin-left 0.2s'
          }}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/properties" element={<AllProperties />} />

            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute user={user}><Messenger /></ProtectedRoute>} />
            <Route path="/add-property" element={<ProtectedRoute user={user}><UploadProperty /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute user={user}><MyFavorites /></ProtectedRoute>} />
            <Route path="/my-properties" element={<ProtectedRoute user={user}><MyProperties /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute user={user}><Reviews /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
       <Footer user={user} />
      {(modal === 'login' || modal === 'signup') && (
        <Modal onClose={() => setModal(null)}>
          <RegisterLogin
            onSuccess={handleAuthSuccess}
            defaultMode={modal}
          />
        </Modal>
      )}
    </div>
  );
}
