/* ----------  Profile.jsx  ---------- */
import React, { useState, useRef } from 'react';
import { BsCamera, BsEye, BsEyeSlash } from 'react-icons/bs';

/* ────────────────────────────────────
   Seed data – would normally come from
   an API call after user login
──────────────────────────────────────*/
const initialProfile = {
  avatar:
    'https://randomuser.me/api/portraits/men/32.jpg',
  fullName: 'Demo Agent',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum mattis nisl, at malesuada justo tempor at.',
  company: 'Your Company',
  position: 'Realtor',
  officeNumber: '133-256-5894',
  officeAddress: '10 Bringhurst St, Houston, TX',
  job: 'Real-Estate Agent',
  email: 'demo@roomhub.io',
  phone: '133-256-5894',
  location: '634 E 236th St, Bronx, NY 10466',
  facebook: '#',
  twitter: '#',
  linkedin: '#'
};

/* ────────────────────────────────────
   Component
──────────────────────────────────────*/
export default function Profile() {
  /* state */
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialProfile);
  const [avatarPreview, setAvatarPreview] = useState(
    initialProfile.avatar
  );

  const [pwd, setPwd] = useState({
    old: '',
    new: '',
    confirm: ''
  });
  const [showPwd, setShowPwd] = useState(false);

  const fileRef = useRef(null);

  /* handlers */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    setForm({ ...form, avatar: file });
  };

  const startEdit = () => {
    setForm(profile);
    setAvatarPreview(profile.avatar);
    setEditMode(true);
  };

  const cancelEdit = () => setEditMode(false);

  const saveProfile = (e) => {
    e.preventDefault();
    // 👉🏻 send `form` to API here
    setProfile({ ...form, avatar: avatarPreview });
    setEditMode(false);
  };

  const handlePwd = (e) =>
    setPwd({ ...pwd, [e.target.name]: e.target.value });

  const updatePwd = (e) => {
    e.preventDefault();
    if (pwd.new !== pwd.confirm) {
      return alert("Passwords don't match.");
    }
    // 👉🏻 call change-password endpoint here
    alert('Password updated!');
    setPwd({ old: '', new: '', confirm: '' });
  };

  /* reusable */
  const TextField = ({
    label,
    name,
    type = 'text',
    ...rest
  }) => (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="form-control"
        value={form[name]}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );

  /* ---------------------------------- */
  return (
    <section className="profile-container fade-in-up">
      {/* heading */}
      <header className="mb-4">
        <h1 className="h2 fw-bold text-gradient">
          My Profile
        </h1>
      </header>

      {/* ========================
          EDIT MODE
      ======================== */}
      {editMode && (
        <form
          onSubmit={saveProfile}
          className="profile-edit"
        >
          {/* avatar + full name */}
          <div className="d-flex flex-wrap gap-4 mb-4">
            <div className="position-relative">
              <img
                src={avatarPreview}
                alt="avatar"
                className="rounded-circle shadow"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover'
                }}
              />
              <button
                type="button"
                className="btn btn-light btn-sm rounded-circle position-absolute bottom-0 end-0"
                title="Change avatar"
                onClick={() => fileRef.current.click()}
              >
                <BsCamera />
              </button>
              <input
                ref={fileRef}
                hidden
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            <TextField
              label="Full Name"
              name="fullName"
              required
            />
          </div>

          {/* description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              About Me
            </label>
            <textarea
              className="form-control"
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* org */}
          <div className="row g-3">
            <div className="col-md-6">
              <TextField label="Company" name="company" />
            </div>
            <div className="col-md-6">
              <TextField label="Position" name="position" />
            </div>
            <div className="col-md-6">
              <TextField
                label="Office Number"
                name="officeNumber"
              />
            </div>
            <div className="col-md-6">
              <TextField
                label="Office Address"
                name="officeAddress"
              />
            </div>
            <div className="col-md-6">
              <TextField label="Email" name="email" type="email" required />
            </div>
            <div className="col-md-6">
              <TextField label="Phone" name="phone" />
            </div>
            <div className="col-md-6">
              <TextField label="Location" name="location" />
            </div>
            <div className="col-md-6">
              <TextField label="Job Title" name="job" />
            </div>
          </div>

          {/* actions */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={cancelEdit}
            >
              Cancel
            </button>
            <button className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* ========================
          VIEW MODE
      ======================== */}
      {!editMode && (
        <>
          {/* top summary */}
          <div className="d-flex flex-wrap gap-4 mb-4 align-items-center">
            <img
              src={profile.avatar}
              alt="avatar"
              className="rounded-circle shadow"
              style={{
                width: 120,
                height: 120,
                objectFit: 'cover'
              }}
            />
            <div>
              <h2 className="fw-bold mb-1">
                {profile.fullName}
              </h2>
              <p className="text-muted mb-0">
                {profile.position}  ·  {profile.company}
              </p>
            </div>
          </div>

          <p className="mb-4">{profile.description}</p>

          {/* details grid */}
          <div className="row g-3 mb-5">
            <div className="col-md-6">
              <strong>Email:</strong> {profile.email}
            </div>
            <div className="col-md-6">
              <strong>Phone:</strong> {profile.phone}
            </div>
            <div className="col-md-6">
              <strong>Office No.:</strong> {profile.officeNumber}
            </div>
            <div className="col-md-6">
              <strong>Office Address:</strong>{' '}
              {profile.officeAddress}
            </div>
            <div className="col-md-12">
              <strong>Location:</strong> {profile.location}
            </div>
          </div>

          {/* buttons */}
          <button
            className="btn btn-primary mb-5"
            onClick={startEdit}
          >
            Edit Profile
          </button>

          {/* =========  Password  ========= */}
          <h3 className="h5 fw-bold text-gradient mb-3">
            Update Password
          </h3>
          <form
            className="row g-3 mb-5"
            onSubmit={updatePwd}
          >
            {['old', 'new', 'confirm'].map((key) => (
              <div className="col-md-4" key={key}>
                <div className="position-relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    name={key}
                    placeholder={
                      key === 'old'
                        ? 'Old Password'
                        : key === 'new'
                        ? 'New Password'
                        : 'Confirm'
                    }
                    className="form-control"
                    value={pwd[key]}
                    onChange={handlePwd}
                    required
                  />
                  {/* eye icon */}
                  {key !== 'old' && (
                    <button
                      type="button"
                      className="btn position-absolute top-50 end-0 translate-middle-y px-2"
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      {showPwd ? <BsEyeSlash /> : <BsEye />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="col-12">
              <button className="btn btn-success">
                Update Password
              </button>
            </div>
          </form>

          {/* =========  Agent section  ========= */}
          <div className="border rounded p-4 bg-light-subtle">
            <p className="mb-2">
              Your current account type is&nbsp;
              <span className="fw-bold text-gradient">
                agent
              </span>
              .
            </p>
            <p className="mb-3">
              Want to downgrade to a normal account?
              Click the button below.
            </p>
            <button className="btn btn-warning">
              Remove Agent Status
            </button>
          </div>
        </>
      )}
    </section>
  );
}
