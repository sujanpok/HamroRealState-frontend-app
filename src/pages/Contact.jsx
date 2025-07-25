import React from 'react';

export default function Contact() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center shadow rounded bg-white p-3">
          {/* Left: Demo Image */}
          <div className="col-lg-6 mb-4 mb-lg-0 text-center">
            <img
              src="https://themesdesign.in/thamza/layouts/images/features/img-3.png"
              alt="Contact illustration"
              className="img-fluid rounded"
              style={{ maxHeight: 350, objectFit: 'cover' }}
            />
          </div>
          {/* Right: Contact Form */}
          <div className="col-lg-6">
            <h2 className="mb-3 text-primary fw-bold">Contact Us</h2>
            <p className="text-muted mb-4">
              We'd love to hear from you! Please fill out the form and we'll get in touch as soon as possible.
            </p>
            <form>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" placeholder="Type your message..." required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
