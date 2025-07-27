// RegisterLogin.jsx
import React, { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { setToken } from "../utils/auth";
const API_BASE_URL = import.meta.env.VITE_AUTH_MICROSRVICES_URL;

export default function RegisterLogin({ onSuccess, defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode); // 'login' or 'signup'
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ full_name: "", gender: "", email: "", password: "" });
  const [error, setError] = useState("");

  // 通常ログインハンドラ
  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.status === 200 && data.token) {
        setToken(data.token);
        // Fetch user profile
        const profileRes = await fetch(`${API_BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
        });
        const profileData = await profileRes.json();
        if (profileRes.status === 200 && profileData.profile) {
          onSuccess && onSuccess(profileData.profile);
        } else {
          setError("Failed to fetch user profile");
        }
      } else {
        setError(data.error || data.message || "Login failed");
      }
    } catch {
      setError("Server error");
    }
  };

  // サインアップハンドラ
  const handleSignupChange = (e) =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (res.status === 201) {
        setMode("login");
        setError("Registration successful! Please login.");
      } else if (data.error) {
        setError(data.error);
      } else if (data.message) {
        setError(data.message);
      } else if (data.errors && Array.isArray(data.errors)) {
        setError(data.errors.map((err) => err.msg || err).join(", "));
      } else {
        setError("Registration failed");
      }
    } catch {
      setError("Server error");
    }
  };

  // Google認証ハンドラ
  const handleGoogleSuccess = async (token) => {
    setToken(token);
    const profileRes = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profileData = await profileRes.json();
    if (profileRes.status === 200 && profileData.profile) {
      onSuccess && onSuccess(profileData.profile);
    } else {
      setError("Google login: Could not load profile");
    }
  };

  return (
    <div className="p-3" style={{ maxWidth: 400, margin: "0 auto" }}>
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn btn-link ${mode === "login" ? "fw-bold text-primary" : ""}`}
          onClick={() => { setMode("login"); setError(""); }}
        >
          Login
        </button>
        <span className="mx-2">|</span>
        <button
          className={`btn btn-link ${mode === "signup" ? "fw-bold text-warning" : ""}`}
          onClick={() => { setMode("signup"); setError(""); }}
        >
          Sign Up
        </button>
      </div>

      {mode === "login" && (
        <form onSubmit={handleLoginSubmit}>
          <h2 className="mb-4 text-primary text-center">Login</h2>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>
          <div className="d-flex justify-content-center my-2">
            <span>or</span>
          </div>
          {/* Googleログイン */}
          <GoogleLoginButton
            label="Login with Google"
            onSuccess={handleGoogleSuccess}
            onError={setError}
          />
        </form>
      )}

      {mode === "signup" && (
        <form onSubmit={handleSignupSubmit}>
          <h2 className="mb-4 text-warning text-center">Sign Up</h2>
          <div className="mb-3">
            <input
              name="full_name"
              className="form-control"
              placeholder="Full Name"
              value={signupForm.full_name}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="mb-3">
            <select
              name="gender"
              className="form-select"
              value={signupForm.gender}
              onChange={handleSignupChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="9">Not specified</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              value={signupForm.email}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={signupForm.password}
              onChange={handleSignupChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 mb-2">
            Register
          </button>
          <div className="d-flex justify-content-center my-2">
            <span>or</span>
          </div>
          {/* Googleサインイン */}
          <GoogleLoginButton
            label="Sign up with Google"
            onSuccess={handleGoogleSuccess}
            onError={setError}
          />
        </form>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
