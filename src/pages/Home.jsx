import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy image fallback
const DUMMY_IMAGE = "https://placeholdit.com/600x400/8ebbda/9e9cd8?text=loading...&font=cairo";

// Helper to format price as currency
function formatPrice(price) {
  if (!price || isNaN(Number(price))) return 'Price not set';
  return Number(price) > 0
    ? `$${Number(price).toLocaleString()}`
    : 'Price on request';
}

// API base from environment
const API_BASE = import.meta.env.VITE_ROOM_MICROSRVICES_URL;

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/properties`)
      .then(res => {
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        return res.json();
      })
      .then(data => setProperties(data))
      .catch(err => {
        setFetchError('Failed to fetch properties. Please try again.');
        console.error('Property fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-dark text-white py-5"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat",
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold mb-3">
                Find Your Perfect Home
              </h1>
              <p className="lead mb-4">
                Discover beautiful properties, top-rated agents, and the easiest way to buy or rent your dream home.
              </p>
              <form className="d-flex justify-content-center mt-4" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  className="form-control form-control-lg w-50 rounded-start"
                  placeholder="City, ZIP or Area"
                />
                <button
                  className="btn btn-primary btn-lg rounded-end"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Popular Properties</h2>
            <Link to="/properties" className="btn btn-outline-primary">
              View all properties
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {loading ? (
              <div className="text-center my-5 w-100">
                <span className="spinner-border" role="status"></span>
                <span className="ms-2">Loading properties...</span>
              </div>
            ) : fetchError ? (
              <div className="text-center text-danger my-5 w-100">
                {fetchError}
              </div>
            ) : properties.length ? (
              properties.slice(0, 6).map(property => {
                const imageInfo = DUMMY_IMAGE;
                return (
                  <div className="col" key={property.PROPERTY_ID}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={imageInfo}
                        className="card-img-top"
                        alt={property.TITLE}
                        style={{ objectFit: 'cover', height: 200 }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{property.TITLE}</h5>
                        <div className="mb-2 text-success">{formatPrice(property.PRICE)}</div>
                        <p className="card-text text-muted mb-1">
                          {property.LOCATION}, {property.CITY}
                        </p>
                        <Link
                          to={`/property/${property.PROPERTY_ID}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          See details
                        </Link>
                        {/* If you want to access file_id: <span>{imageInfo.file_id}</span> */}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center my-5 w-100">
                <span>No properties found.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">
            What Our Customers Say
          </h2>
          <div className="row justify-content-center">
            {[
              {
                name: 'Cameron Webster',
                img: 'https://randomuser.me/api/portraits/men/32.jpg',
                text: 'The team made buying a home easy and enjoyable. Highly recommended!',
              },
              {
                name: 'Dew Smith',
                img: 'https://randomuser.me/api/portraits/women/44.jpg',
                text: 'Fantastic service and great property selection. I found my dream home quickly.',
              },
              {
                name: 'James Smith',
                img: 'https://randomuser.me/api/portraits/men/33.jpg',
                text: 'Professional, responsive, and friendly agents. The best real estate experience I\'ve had.',
              },
            ].map((t, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card border-0 shadow-sm h-100 text-center">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="rounded-circle mx-auto mt-4"
                    style={{ width: 80, height: 80, objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{t.name}</h5>
                    <p className="card-text text-muted">{t.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
