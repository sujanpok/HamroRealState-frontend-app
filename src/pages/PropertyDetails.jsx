import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const demoProperties = [
  {
    id: '1',
    title: 'Casa Lomas de Machalí Machas',
    price: '$250,000',
    location: '145 Brooklyn Ave, California, New York',
    images: [
      'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
    ],
    description:
      'A stunning modern home with open spaces, beautiful landscaping, and top-notch amenities. Perfect for families seeking comfort and style in a prime location.',
    features: [
      { icon: 'bi-house', label: '3 Beds' },
      { icon: 'bi-bathtub', label: '2 Baths' },
      { icon: 'bi-aspect-ratio', label: '1150 Sqft' },
      { icon: 'bi-geo-alt', label: 'Great Location' },
    ],
    agent: {
      name: 'Davin Smith',
      role: 'Property Consultant',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      phone: '(555) 123-4567',
      email: 'davin@realestate.com',
    },
  },
  // ...other properties
];

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = demoProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-3 text-danger">Property Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Gallery & Main Info */}
        <div className="row g-4 mb-4 align-items-center">
          <div className="col-lg-7">
            <div className="row g-2">
              {property.images.map((img, idx) => (
                <div className="col-4" key={idx}>
                  <img
                    src={img}
                    alt={`Property ${idx + 1}`}
                    className="img-fluid rounded shadow-sm"
                    style={{ height: 180, objectFit: 'cover', width: '100%' }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5">
            <h1 className="fw-bold mb-2">{property.title}</h1>
            <h3 className="text-primary mb-2">{property.price} <span className="fs-6 text-muted">/month</span></h3>
            <p className="mb-2 text-muted">
              <i className="bi bi-geo-alt me-2"></i>
              {property.location}
            </p>
            <ul className="list-inline mb-4">
              {property.features.map((f, idx) => (
                <li className="list-inline-item me-3" key={idx}>
                  <i className={`bi ${f.icon} text-primary me-1`}></i>
                  {f.label}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary me-2">Book a Visit</button>
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
              Back to Listings
            </button>
          </div>
        </div>

        {/* Description & Agent */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Property Description</h4>
                <p className="mb-0">{property.description}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <img
                  src={property.agent.img}
                  alt={property.agent.name}
                  className="rounded-circle mb-3"
                  style={{ width: 80, height: 80, objectFit: 'cover' }}
                />
                <h5 className="fw-bold mb-1">{property.agent.name}</h5>
                <p className="text-muted mb-2">{property.agent.role}</p>
                <p className="mb-1">
                  <i className="bi bi-telephone me-1"></i>
                  {property.agent.phone}
                </p>
                <p className="mb-3">
                  <i className="bi bi-envelope me-1"></i>
                  {property.agent.email}
                </p>
                <button className="btn btn-outline-primary btn-sm w-100">Contact Agent</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
