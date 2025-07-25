import React, { useState, useRef } from 'react';

const initialProfile = {
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  fullName: 'Demo Agent',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  company: 'Your Company',
  position: 'Your Company',
  officeNumber: '1332565894',
  officeAddress: '10 Bringhurst St, Houston, TX',
  job: 'Realter',
  email: 'themeflat@gmail.com',
  phone: '1332565894',
  location: '634 E 236th St, Bronx, NY 10466',
  facebook: '#',
  twitter: '#',
  linkedin: '#',
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setForm({ ...form, avatar: file });
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setForm(profile);
    setAvatarPreview(profile.avatar);
    setEditMode(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Normally, upload avatar and save form to backend here
    setProfile({ ...form, avatar: avatarPreview });
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Add password update logic here
    setPasswords({ old: '', new: '', confirm: '' });
    alert('Password updated!');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="mb-4 fw-bold">Profile Information</h4>
              <div className="d-flex align-items-center mb-4">
                <div className="me-4 position-relative">
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    className="rounded-circle border"
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                  {editMode && (
                    <button
                      className="btn btn-sm btn-secondary position-absolute bottom-0 end-0"
                      onClick={() => fileInputRef.current.click()}
                      type="button"
                      style={{ borderRadius: '50%' }}
                    >
                      <i className="bi bi-camera"></i>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div>
                  <h5 className="mb-1">{profile.fullName}</h5>
                  <div className="text-muted">{profile.position}</div>
                </div>
              </div>
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description*</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Your Company*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Position*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Office Number*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="officeNumber"
                      value={form.officeNumber}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Office Address*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="officeAddress"
                      value={form.officeAddress}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Job*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="job"
                      value={form.job}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Email address*</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Your Phone*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Location*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Facebook*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="facebook"
                      value={form.facebook}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Twitter*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="twitter"
                      value={form.twitter}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Linkedin*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  {!editMode ? (
                    <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button type="submit" className="btn btn-primary">Save & Update</button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-4 fw-bold">Change Password</h4>
              <form onSubmit={handleUpdatePassword}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Old Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    name="old"
                    value={passwords.old}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">New Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Confirm Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-warning">Update Password</button>
              </form>
            </div>
          </div>
          {/* Account Settings Section */}
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h4 className="mb-3 fw-bold">Account Settings</h4>
                <div className="mb-3">
                  <span className="badge bg-info text-dark mb-2">Agent Account</span>
                  <p className="mb-3">
                    Your current account type is set to <b>agent</b>. If you want to remove your agent account and return to a normal account, click the button below.
                  </p>
                  <button
                    className="btn btn-danger"
                    type="button"
                    // onClick={handleRemoveAgentAccount} // Add your logic here
                  >
                    Remove Agent Account
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
