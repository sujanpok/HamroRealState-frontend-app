import React from 'react';
import { useTheme } from '../App';

export default function About() {
  const { theme } = useTheme();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 fade-in-up">
              <h1 className="display-4 fw-bold mb-4 text-gradient">
                About Nepal Room Hub
              </h1>
              <p className="lead mb-4 text-muted">
                We are passionate about connecting people with their perfect living spaces across Nepal. 
                Our journey began with a vision to make room hunting accessible, transparent, and enjoyable for everyone.
              </p>
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="stat-card text-center">
                    <h3 className="fw-bold text-primary">1000+</h3>
                    <p className="small text-muted mb-0">Happy Tenants</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-card text-center">
                    <h3 className="fw-bold text-primary">50+</h3>
                    <p className="small text-muted mb-0">Cities Covered</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 fade-in-right">
              <img 
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop" 
                alt="Our team"
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4 fade-in-up">
              <div className="feature-card-modern h-100 text-center">
                <div className="feature-icon bg-primary bg-gradient">
                  <i className="bi bi-bullseye"></i>
                </div>
                <h4 className="fw-bold mb-3">Our Mission</h4>
                <p className="text-muted">
                  To revolutionize the room rental experience in Nepal by providing a trusted, 
                  transparent platform that connects tenants with quality accommodations.
                </p>
              </div>
            </div>
            <div className="col-lg-4 fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="feature-card-modern h-100 text-center">
                <div className="feature-icon bg-success bg-gradient">
                  <i className="bi bi-eye"></i>
                </div>
                <h4 className="fw-bold mb-3">Our Vision</h4>
                <p className="text-muted">
                  To become Nepal's most trusted room rental platform, making quality housing 
                  accessible to students, professionals, and families nationwide.
                </p>
              </div>
            </div>
            <div className="col-lg-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="feature-card-modern h-100 text-center">
                <div className="feature-icon bg-warning bg-gradient">
                  <i className="bi bi-heart"></i>
                </div>
                <h4 className="fw-bold mb-3">Our Values</h4>
                <p className="text-muted">
                  Trust, transparency, and customer satisfaction drive everything we do. 
                  We believe everyone deserves a safe, comfortable place to call home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light-subtle">
        <div className="container">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="display-5 fw-bold mb-3">What We Offer</h2>
            <p className="lead text-muted">Comprehensive room rental services across Nepal</p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: 'bi-search',
                title: 'Find Rooms',
                desc: 'Browse thousands of verified room listings across major cities in Nepal.',
                link: '/properties'
              },
              {
                icon: 'bi-house-add',
                title: 'List Your Room',
                desc: 'Easy-to-use platform for room owners to list their properties and find tenants.',
                link: '/add-property'
              },
              {
                icon: 'bi-shield-check',
                title: 'Verification Service',
                desc: 'All listings are verified by our team to ensure authenticity and quality.',
                link: '#'
              },
              {
                icon: 'bi-headset',
                title: 'Customer Support',
                desc: '24/7 customer support in Nepali and English to assist with any queries.',
                link: '/contact'
              },
              {
                icon: 'bi-people',
                title: 'Room Consultation',
                desc: 'Expert advice on room selection, pricing, and rental agreements.',
                link: '#'
              },
              {
                icon: 'bi-graph-up',
                title: 'Market Insights',
                desc: 'Regular market reports and rental trends to help make informed decisions.',
                link: '#'
              }
            ].map((service, index) => (
              <div key={index} className="col-lg-4 col-md-6 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-card h-100 hover-lift">
                  <div className="service-icon">
                    <i className={`bi ${service.icon}`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{service.title}</h5>
                  <p className="text-muted mb-4">{service.desc}</p>
                  <a href={service.link} className="btn btn-outline-primary btn-sm">
                    Learn More <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="display-5 fw-bold mb-3">Meet Our Team</h2>
            <p className="lead text-muted">Passionate professionals dedicated to serving you</p>
          </div>

          <div className="row g-4">
            {[
              {
                name: 'Ramesh Adhikari',
                role: 'Founder & CEO',
                image: 'https://ui-avatars.com/api/?name=Ramesh+Adhikari&background=007bff&color=fff&size=200',
                description: 'Visionary leader with 10+ years in Nepal real estate market.'
              },
              {
                name: 'Sushma Shrestha',
                role: 'Head of Operations',
                image: 'https://ui-avatars.com/api/?name=Sushma+Shrestha&background=28a745&color=fff&size=200',
                description: 'Expert in property verification and customer relations.'
              },
              {
                name: 'Bikash Tamang',
                role: 'Technology Lead',
                image: 'https://ui-avatars.com/api/?name=Bikash+Tamang&background=dc3545&color=fff&size=200',
                description: 'Tech enthusiast building innovative solutions for room rentals.'
              }
            ].map((member, index) => (
              <div key={index} className="col-lg-4 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="team-card text-center hover-lift">
                  <div className="team-image-container mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="team-image"
                    />
                  </div>
                  <h5 className="fw-bold mb-2">{member.name}</h5>
                  <p className="text-primary fw-semibold mb-3">{member.role}</p>
                  <p className="text-muted">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <div className="fade-in-up">
            <h2 className="display-5 fw-bold mb-3 text-white">Ready to Get Started?</h2>
            <p className="lead mb-4 text-white-50">
              Join thousands who trust Nepal Room Hub for their accommodation needs
            </p>
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <a href="/properties" className="btn btn-light btn-lg btn-animated px-5">
                <i className="bi bi-search me-2"></i>Find Rooms
              </a>
              <a href="/contact" className="btn btn-outline-light btn-lg btn-animated px-5">
                <i className="bi bi-telephone me-2"></i>Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
