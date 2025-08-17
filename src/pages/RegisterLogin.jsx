import React, { useState, useCallback, useMemo } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import { setToken } from '../utils/auth';
import { useTheme } from '../App';

const API_BASE_URL = import.meta.env.VITE_AUTH_MICROSRVICES_URL;

export default function RegisterLogin({ onSuccess, defaultMode = 'login', onToggle }) {
  const { theme } = useTheme();
  const [mode, setMode] = useState(defaultMode);
  const [loginForm, setLoginForm] = useState({ 
    email: '', 
    password: '' 
  });
  const [signupForm, setSignupForm] = useState({ 
    full_name: '', 
    gender: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Memoized validation functions to prevent recreation on every render
  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password) => {
    return password.length >= 5;
  }, []);

  // Optimized change handlers with minimal re-renders
  const handleLoginChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    
    // Only clear error if there is one, to prevent unnecessary updates
    if (error) {
      setError('');
    }
  }, [error]);

  const handleSignupChange = useCallback((e) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
    
    // Only clear error if there is one, to prevent unnecessary updates
    if (error) {
      setError('');
    }
  }, [error]);

  // Memoized password toggle handlers
  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  // Optimized login submit handler
  const handleLoginSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    
    // Client-side validation
    if (!validateEmail(loginForm.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    if (!validatePassword(loginForm.password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      
      const data = await res.json();
      
      if (res.status === 200 && data.token) {
        setToken(data.token);
        
        // Fetch user profile
        const profileRes = await fetch(`${API_BASE_URL}/dashboard`, {
          headers: { 
            Authorization: `Bearer ${data.token}`, 
            'Content-Type': 'application/json' 
          },
        });
        
        const profileData = await profileRes.json();
        
        if (profileRes.status === 200 && profileData.profile) {
          onSuccess && onSuccess(profileData.profile);
        } else {
          setError('Failed to fetch user profile. Please try again.');
        }
      } else {
        setError(data.error || data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Server connection failed. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [loginForm, validateEmail, validatePassword, onSuccess]);

  // Optimized signup submit handler
  const handleSignupSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    
    // Client-side validation
    if (!signupForm.full_name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    
    if (!validateEmail(signupForm.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    if (!validatePassword(signupForm.password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!signupForm.gender) {
      setError('Please select your gender.');
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: signupForm.full_name,
          gender: signupForm.gender,
          email: signupForm.email,
          password: signupForm.password
        }),
      });
      
      const data = await res.json();
      
      if (res.status === 201) {
        setMode('login');
        setError('Registration successful! Please login with your credentials.');
        setSignupForm({ 
          full_name: '', 
          gender: '', 
          email: '', 
          password: '',
          confirmPassword: ''
        });
      } else if (data.error) {
        setError(data.error);
      } else if (data.message) {
        setError(data.message);
      } else if (data.errors && Array.isArray(data.errors)) {
        setError(data.errors.map((err) => err.msg || err).join(', '));
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Server connection failed. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [signupForm, validateEmail, validatePassword]);

  // Optimized Google success handler
  const handleGoogleSuccess = useCallback(async (token) => {
    setError('');
    setIsLoading(true);
    
    try {
      setToken(token);
      
      const profileRes = await fetch(`${API_BASE_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const profileData = await profileRes.json();
      
      if (profileRes.status === 200 && profileData.profile) {
        onSuccess && onSuccess(profileData.profile);
      } else {
        setError('Google login successful, but failed to load profile. Please try again.');
      }
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  // Optimized mode toggle
  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    setError('');
    setLoginForm({ email: '', password: '' });
    setSignupForm({ full_name: '', gender: '', email: '', password: '', confirmPassword: '' });
    onToggle && onToggle();
  }, [onToggle]);

  // Memoized error clearing function
  const clearError = useCallback(() => setError(''), []);

  // Memoized header content to prevent unnecessary re-renders
  const headerContent = useMemo(() => ({
    title: mode === 'login' ? 'Welcome Back!' : 'Join Nepal Room Hub',
    subtitle: mode === 'login' 
      ? 'Sign in to find your perfect room in Nepal' 
      : 'Create your account to start your room hunting journey'
  }), [mode]);

  return (
    <div className="register-login-container fade-in-up">
      <div className="auth-card glass-morphism p-0 overflow-hidden">
        {/* Header Section */}
        <div className="auth-header text-center p-4">
          <div className="auth-logo mb-3">
            <i className="bi bi-house-heart-fill text-primary" style={{ fontSize: '3rem' }}></i>
          </div>
          <h2 className="fw-bold mb-2 text-gradient">
            {headerContent.title}
          </h2>
          <p className="text-muted mb-0">
            {headerContent.subtitle}
          </p>
        </div>

        {/* Form Section */}
        <div className="auth-form-container p-4">
          {/* Error Alert */}
          {error && (
            <div className={`alert ${error.includes('successful') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
              <i className={`bi ${error.includes('successful') ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={clearError}
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control auth-input"
                  id="loginEmail"
                  name="email"
                  placeholder="Email address"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  autoFocus
                  disabled={isLoading}
                  autoComplete="email"
                />
                <label htmlFor="loginEmail">
                  <i className="bi bi-envelope me-2"></i>Email Address
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control auth-input"
                  id="loginPassword"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <label htmlFor="loginPassword">
                  <i className="bi bi-lock me-2"></i>Password
                </label>
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={toggleShowPassword}
                  tabIndex="-1"
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label small text-muted" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#" className="small text-primary text-decoration-none">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 mb-4 btn-animated auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In to Your Account
                  </>
                )}
              </button>

              <div className="divider mb-4">
                <span className="divider-text">or continue with</span>
              </div>

              <GoogleLoginButton onSuccess={handleGoogleSuccess} disabled={isLoading} />

              <div className="auth-switch mt-4 text-center">
                <p className="mb-0 text-muted">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0 fw-semibold text-decoration-none"
                    onClick={toggleMode}
                    disabled={isLoading}
                  >
                    Create your account
                  </button>
                </p>
              </div>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignupSubmit} className="auth-form">
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control auth-input"
                      id="signupFullName"
                      name="full_name"
                      placeholder="Full Name"
                      value={signupForm.full_name}
                      onChange={handleSignupChange}
                      required
                      autoFocus
                      disabled={isLoading}
                      autoComplete="name"
                    />
                    <label htmlFor="signupFullName">
                      <i className="bi bi-person me-2"></i>Full Name
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <select
                      className="form-select auth-input"
                      id="signupGender"
                      name="gender"
                      value={signupForm.gender}
                      onChange={handleSignupChange}
                      required
                      disabled={isLoading}
                    >
                      <option value="">Choose...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    <label htmlFor="signupGender">
                      <i className="bi bi-gender-ambiguous me-2"></i>Gender
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control auth-input"
                  id="signupEmail"
                  name="email"
                  placeholder="Email Address"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
                <label htmlFor="signupEmail">
                  <i className="bi bi-envelope me-2"></i>Email Address
                </label>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <div className="form-floating position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control auth-input"
                      id="signupPassword"
                      name="password"
                      placeholder="Password"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      required
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    <label htmlFor="signupPassword">
                      <i className="bi bi-lock me-2"></i>Password
                    </label>
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={toggleShowPassword}
                      tabIndex="-1"
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating position-relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control auth-input"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                      required
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    <label htmlFor="confirmPassword">
                      <i className="bi bi-lock-fill me-2"></i>Confirm Password
                    </label>
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={toggleShowConfirmPassword}
                      tabIndex="-1"
                    >
                      <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                <label className="form-check-label small text-muted" htmlFor="agreeTerms">
                  I agree to the{' '}
                  <a href="#" className="text-primary text-decoration-none">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100 mb-4 btn-animated auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Create Your Account
                  </>
                )}
              </button>

              <div className="auth-switch mt-4 text-center">
                <p className="mb-0 text-muted">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0 fw-semibold text-decoration-none"
                    onClick={toggleMode}
                    disabled={isLoading}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Footer Section */}
        <div className="auth-footer text-center p-3 border-top">
          <small className="text-muted">
            <i className="bi bi-shield-lock me-1"></i>
            Your data is secure and protected with us
          </small>
        </div>
      </div>
    </div>
  );
}
