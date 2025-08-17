import React, { useState, useEffect, createContext, useContext } from 'react';
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
import RegisterLogin from './pages/RegisterLogin';
import { getToken } from './utils/auth';
import PropertyDetails from './pages/PropertyDetails';
import AllProperties from './pages/AllProperties';
import Profile from './pages/Profile';
import Messenger from './pages/Messenger';
import UploadProperty from './pages/UploadProperty';
import MyFavorites from './pages/Favorites';
import MyProperties from './pages/MyProperties';
import Reviews from './pages/Reviews';
import './styles/global.css';

// Add missing API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_AUTH_MICROSRVICES_URL;

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const dashboardRoutes = [
  '/dashboard',
  '/profile',
  '/reviews',
  '/my-properties',
  '/favorites',
  '/messages',
  '/add-property'
];

function isDashboardPage(pathname) {
  return dashboardRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  );
}

export default function App() {
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'light'
  );
  const location = useLocation();
  const navigate = useNavigate();

  // Debug: Log user state changes
  useEffect(() => {
    console.log('🔍 App: User state changed:', user);
  }, [user]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Fetch user profile if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      console.log('🔍 App: Token found:', !!token, token ? 'exists' : 'missing');
      
      if (!token) {
        console.log('🔍 App: No token, setting user to null');
        setUser(null);
        return;
      }

      try {
        console.log('🔍 App: Fetching profile from:', `${API_BASE_URL}/dashboard`);
        const res = await fetch(`${API_BASE_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await res.json();
        console.log('🔍 App: Profile response:', { 
          status: res.status, 
          hasProfile: !!data.profile,
          profileData: data.profile 
        });
        
        if (res.status === 200 && data.profile) {
          console.log('🔍 App: Setting user profile:', data.profile);
          setUser(data.profile);
        } else {
          console.log('🔍 App: Profile fetch failed, clearing user. Response:', data);
          setUser(null);
        }
      } catch (error) {
        console.error('🔍 App: Profile fetch error:', error);
        setUser(null);
      }
    };

    fetchProfile();
  }, [modal, location.pathname]);

  const handleAuthSuccess = (profile) => {
    console.log('🔍 App: handleAuthSuccess called with profile:', profile);
    setUser(profile);
    setModal(null);
  };

  const handleLogout = () => {
    console.log('🔍 App: Logout initiated');
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  const showSidebar = user && isDashboardPage(location.pathname);
  
  console.log('🔍 App: Render state - user exists:', !!user, 'showSidebar:', showSidebar);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container ${theme} fade-in`}>
        <Header 
          user={user} 
          onLogout={handleLogout} 
          onAuthOpen={setModal}
        />
        
        <div className={`main-content ${showSidebar ? 'with-sidebar' : ''}`}>
          {showSidebar && (
            <Sidebar onLogout={handleLogout} />
          )}
          
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties" element={<AllProperties />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/dashboard" element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute user={user}>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/reviews" element={
                <ProtectedRoute user={user}>
                  <Reviews />
                </ProtectedRoute>
              } />
              <Route path="/my-properties" element={
                <ProtectedRoute user={user}>
                  <MyProperties />
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute user={user}>
                  <MyFavorites />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute user={user}>
                  <Messenger />
                </ProtectedRoute>
              } />
              <Route path="/add-property" element={
                <ProtectedRoute user={user}>
                  <UploadProperty />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>

        <Footer user={user} />

        {modal && (
          <Modal onClose={() => setModal(null)}>
            <RegisterLogin 
              mode={modal}
              onSuccess={handleAuthSuccess}
              onToggle={() => setModal(modal === 'login' ? 'signup' : 'login')}
            />
          </Modal>
        )}
      </div>
    </ThemeContext.Provider>
  );
}
