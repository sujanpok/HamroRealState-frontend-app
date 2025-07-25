import React from 'react';

export default function About() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Hero Section with Image and Story */}
        <div className="row gx-4 align-items-center justify-content-between mb-5">
          <div className="col-md-6 order-2 order-md-1">
            <div className="me-md-3 me-lg-5">
              <span className="text-muted">Our Story</span>
              <h2 className="display-5 fw-bold">About Us</h2>
              <p className="lead">
                We are passionate about delivering quality properties and exceptional service. Our journey began with a vision to make real estate accessible, transparent, and enjoyable for everyone. Today, we are proud to help thousands find their dream homes with trust and ease.
              </p>
              <ul className="list-unstyled mt-4">
                <li className="mb-2">
                  <i className="bi bi-house-door text-primary me-2"></i>
                  <b>Quality Properties</b> – Handpicked listings for every lifestyle.
                </li>
                <li className="mb-2">
                  <i className="bi bi-star text-warning me-2"></i>
                  <b>Top Rated Agents</b> – Experienced professionals to guide you.
                </li>
                <li>
                  <i className="bi bi-shield-check text-success me-2"></i>
                  <b>Easy & Safe</b> – Secure processes and transparent deals.
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 order-1 order-md-2 text-center mb-4 mb-md-0">
            <img
              src="https://freefrontend.dev/assets/square.png"
              alt="About us illustration"
              className="img-fluid rounded-3 shadow"
              style={{ maxHeight: 350, objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="row text-center mb-5">
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3 className="fw-bold text-primary">2,917</h3>
            <p className="mb-0 text-muted">Buy Properties</p>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3 className="fw-bold text-primary">3,918</h3>
            <p className="mb-0 text-muted">Sell Properties</p>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold text-primary">38,928</h3>
            <p className="mb-0 text-muted">All Properties</p>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold text-primary">1,291</h3>
            <p className="mb-0 text-muted">Agents</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-5">
          <h2 className="text-center mb-4 fw-bold text-primary">Meet The Team</h2>
          <div className="row justify-content-center">
            <div className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card border-0 shadow-sm text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="Davin Smith"
                  style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title mb-1">Davin Smith</h5>
                  <p className="card-text text-muted mb-2">Property Consultant</p>
                  <div>
                    <i className="bi bi-twitter text-primary me-2"></i>
                    <i className="bi bi-facebook text-primary me-2"></i>
                    <i className="bi bi-linkedin text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card border-0 shadow-sm text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/33.jpg"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="James Smith"
                  style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title mb-1">James Smith</h5>
                  <p className="card-text text-muted mb-2">Manager</p>
                  <div>
                    <i className="bi bi-twitter text-primary me-2"></i>
                    <i className="bi bi-facebook text-primary me-2"></i>
                    <i className="bi bi-linkedin text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card border-0 shadow-sm text-center">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="Carol Houston"
                  style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title mb-1">Carol Houston</h5>
                  <p className="card-text text-muted mb-2">Agent</p>
                  <div>
                    <i className="bi bi-twitter text-primary me-2"></i>
                    <i className="bi bi-facebook text-primary me-2"></i>
                    <i className="bi bi-linkedin text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <img src="https://freefrontend.dev/assets/square.png" className="img-fluid rounded shadow-sm" alt="Gallery 1" />
          </div>
          <div className="col-6 col-md-3">
            <img src="https://freefrontend.dev/assets/square.png" className="img-fluid rounded shadow-sm" alt="Gallery 2" />
          </div>
          <div className="col-6 col-md-3">
            <img src="https://freefrontend.dev/assets/square.png" className="img-fluid rounded shadow-sm" alt="Gallery 3" />
          </div>
          <div className="col-6 col-md-3">
            <img src="https://freefrontend.dev/assets/square.png" className="img-fluid rounded shadow-sm" alt="Gallery 4" />
          </div>
        </div>
      </div>
    </section>
  );
}
