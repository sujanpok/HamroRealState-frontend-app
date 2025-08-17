import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';

const DUMMY_IMAGE = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop";

function formatPrice(price) {
  if (!price || isNaN(Number(price))) return 'Price on request';
  return Number(price) > 0
    ? `NPR ${Number(price).toLocaleString()}/month`
    : 'Contact for price';
}

const API_BASE = import.meta.env.VITE_ROOM_MICROSRVICES_URL;

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/properties`)
      .then(res => {
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        return res.json();
      })
      .then(data => setProperties(data))
      .catch(err => {
        setFetchError('Failed to load rooms. Please try again.');
        console.error('Property fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm, 'in', searchLocation);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-background"></div>
        <div className="container">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6">
              <div className="hero-content fade-in-up">
                <h1 className="display-3 fw-bold mb-4 text-gradient">
                  Find Your Perfect Room in Nepal
                </h1>
                <p className="lead mb-4 text-muted">
                  Discover comfortable, affordable rooms across Kathmandu, Pokhara, Chitwan and other cities. 
                  From cozy single rooms to luxury apartments - your ideal home awaits.
                </p>
                
                {/* Search Form */}
                <div className="search-card glass-morphism p-4 rounded-4 mb-4">
                  <form onSubmit={handleSearch} className="row g-3">
                    <div className="col-md-5">
                      <div className="input-group">
                        <span className="input-group-text border-0 bg-transparent">
                          <i className="bi bi-search text-primary"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-0 bg-transparent"
                          placeholder="Search rooms, apartments..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-group">
                        <span className="input-group-text border-0 bg-transparent">
                          <i className="bi bi-geo-alt text-primary"></i>
                        </span>
                        <select 
                          className="form-select border-0 bg-transparent"
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                        >
                          <option value="">All Cities</option>
                          <option value="kathmandu">Kathmandu</option>
                          <option value="pokhara">Pokhara</option>
                          <option value="chitwan">Chitwan</option>
                          <option value="lalitpur">Lalitpur</option>
                          <option value="bhaktapur">Bhaktapur</option>
                          <option value="dharan">Dharan</option>
                          <option value="butwal">Butwal</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <button type="submit" className="btn btn-primary w-100 btn-animated">
                        <i className="bi bi-search me-2"></i>Search
                      </button>
                    </div>
                  </form>
                </div>

                <div className="hero-stats row g-3 text-center">
                  <div className="col-4">
                    <div className="stat-card">
                      <h3 className="fw-bold text-primary counter">1000+</h3>
                      <p className="small text-muted mb-0">Available Rooms</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-card">
                      <h3 className="fw-bold text-primary counter">500+</h3>
                      <p className="small text-muted mb-0">Happy Tenants</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-card">
                      <h3 className="fw-bold text-primary counter">50+</h3>
                      <p className="small text-muted mb-0">Cities Covered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="hero-image fade-in-right">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop" 
                  alt="Beautiful rooms in Nepal"
                  className="img-fluid rounded-4 shadow-lg floating-animation"
                />
                <div className="hero-image-overlay">
                  <div className="feature-card glass-morphism p-3 rounded-3">
                    <i className="bi bi-shield-check text-primary fs-4"></i>
                    <div className="ms-3">
                      <h6 className="fw-bold mb-1">Verified Rooms</h6>
                      <small className="text-muted">All listings verified by our team</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="display-5 fw-bold mb-3">Featured Rooms in Nepal</h2>
            <p className="lead text-muted">Handpicked rooms from top locations across Nepal</p>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="section-tabs">
              <button className="tab-btn active">All Rooms</button>
              <button className="tab-btn">Kathmandu</button>
              <button className="tab-btn">Pokhara</button>
              <button className="tab-btn">Budget Friendly</button>
            </div>
            <Link to="/properties" className="btn btn-outline-primary btn-animated">
              View All Rooms <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>

          {loading ? (
            <div className="row g-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className="property-card skeleton-loader">
                    <div className="skeleton-image"></div>
                    <div className="p-4">
                      <div className="skeleton-text mb-3"></div>
                      <div className="skeleton-text mb-2"></div>
                      <div className="skeleton-text"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : fetchError ? (
            <div className="text-center py-5">
              <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
              <h4 className="text-muted">{fetchError}</h4>
              <button className="btn btn-primary btn-animated mt-3" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : properties.length ? (
            <div className="row g-4">
              {properties.slice(0, 6).map((property, index) => (
                <div key={property.id || index} className="col-lg-4 col-md-6 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="property-card h-100 hover-lift">
                    <div className="property-image-container">
                      <img
                        src={property.image || DUMMY_IMAGE}
                        alt={property.TITLE || 'Room'}
                        className="property-image"
                        loading="lazy"
                      />
                      <div className="property-overlay">
                        <button className="btn btn-light btn-sm favorite-btn">
                          <i className="bi bi-heart"></i>
                        </button>
                        <div className="property-type-badge">
                          {property.PROPERTY_TYPE || 'Room'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="property-content p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="property-title mb-1">{property.TITLE || 'Comfortable Room'}</h5>
                        <span className="property-price fw-bold text-primary">
                          {formatPrice(property.PRICE)}
                        </span>
                      </div>
                      
                      <div className="property-location mb-3">
                        <i className="bi bi-geo-alt text-muted me-2"></i>
                        <span className="text-muted">
                          {property.LOCATION || 'Kathmandu'}, {property.CITY || 'Nepal'}
                        </span>
                      </div>

                      <div className="property-features mb-3">
                        <div className="row g-2 text-center">
                          <div className="col-4">
                            <small className="feature-item">
                              <i className="bi bi-wifi text-primary d-block mb-1"></i>
                              <span>WiFi</span>
                            </small>
                          </div>
                          <div className="col-4">
                            <small className="feature-item">
                              <i className="bi bi-p-square text-primary d-block mb-1"></i>
                              <span>Parking</span>
                            </small>
                          </div>
                          <div className="col-4">
                            <small className="feature-item">
                              <i className="bi bi-shield-check text-primary d-block mb-1"></i>
                              <span>Secure</span>
                            </small>
                          </div>
                        </div>
                      </div>

                      <Link 
                        to={`/property/${property.id || index}`} 
                        className="btn btn-primary w-100 btn-animated"
                      >
                        <i className="bi bi-eye me-2"></i>View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-house fs-1 text-muted mb-3"></i>
              <h4 className="text-muted">No rooms available at the moment</h4>
              <p className="text-muted">Check back later for new listings!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light-subtle">
        <div className="container">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="display-5 fw-bold mb-3">Why Choose Nepal Room Hub?</h2>
            <p className="lead text-muted">Your trusted partner in finding the perfect accommodation</p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: 'bi-shield-check',
                title: 'Verified Listings',
                desc: 'All rooms are personally verified by our team for authenticity and quality.',
                color: 'primary'
              },
              {
                icon: 'bi-headset',
                title: '24/7 Support',
                desc: 'Round-the-clock customer support in Nepali and English languages.',
                color: 'success'
              },
              {
                icon: 'bi-cash-coin',
                title: 'Best Prices',
                desc: 'Competitive pricing with no hidden fees. Direct contact with room owners.',
                color: 'warning'
              },
              {
                icon: 'bi-geo-alt',
                title: 'All Major Cities',
                desc: 'Rooms available in Kathmandu, Pokhara, Chitwan and 50+ other cities.',
                color: 'info'
              },
              {
                icon: 'bi-house-heart',
                title: 'Homely Environment',
                desc: 'Find rooms that feel like home with friendly landlords and great amenities.',
                color: 'danger'
              },
              {
                icon: 'bi-phone',
                title: 'Easy Booking',
                desc: 'Simple booking process with instant confirmation and flexible payment options.',
                color: 'secondary'
              }
            ].map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-card-modern h-100 text-center hover-lift">
                  <div className={`feature-icon bg-${feature.color} bg-gradient`}>
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="display-5 fw-bold mb-3">What Our Tenants Say</h2>
            <p className="lead text-muted">Real experiences from people who found their perfect room</p>
          </div>

          <div className="row g-4">
            {[
              {
                name: 'Rajesh Shrestha',
                location: 'Kathmandu',
                img: 'https://ui-avatars.com/api/?name=Rajesh+Shrestha&background=007bff&color=fff',
                text: 'Found an amazing room in Thamel through Nepal Room Hub. The process was so smooth and the room exactly matched the photos. Highly recommended!',
                rating: 5
              },
              {
                name: 'Sita Gurung',
                location: 'Pokhara',
                img: 'https://ui-avatars.com/api/?name=Sita+Gurung&background=28a745&color=fff',
                text: 'As a student, I needed an affordable room near my college. Nepal Room Hub helped me find the perfect place within my budget. Great service!',
                rating: 5
              },
              {
                name: 'Arjun Tamang',
                location: 'Lalitpur',
                img: 'https://ui-avatars.com/api/?name=Arjun+Tamang&background=dc3545&color=fff',
                text: 'The team is very professional and helpful. They assisted me throughout the entire process and even helped with the paperwork. Excellent experience!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="col-lg-4 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="testimonial-card h-100 hover-lift">
                  <div className="testimonial-header d-flex align-items-center mb-3">
                    <img 
                      src={testimonial.img} 
                      alt={testimonial.name}
                      className="testimonial-avatar me-3"
                    />
                    <div>
                      <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>{testimonial.location}
                      </small>
                    </div>
                  </div>
                  
                  <div className="testimonial-rating mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                    ))}
                  </div>
                  
                  <p className="testimonial-text mb-0">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section text-white py-5">
        <div className="container text-center">
          <div className="fade-in-up">
            <h2 className="display-5 fw-bold mb-3">Ready to Find Your Perfect Room?</h2>
            <p className="lead mb-4">Join thousands of satisfied tenants who found their ideal accommodation through Nepal Room Hub</p>
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <Link to="/properties" className="btn btn-light btn-lg btn-animated px-5">
                <i className="bi bi-search me-2"></i>Browse Rooms
              </Link>
              <button className="btn btn-outline-light btn-lg btn-animated px-5" onClick={() => onAuthOpen('signup')}>
                <i className="bi bi-person-plus me-2"></i>List Your Room
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
