import React from 'react';
import { Link } from 'react-router-dom';

const demoProperties = [
  {
    id: '1',
    title: 'Modern Family Home',
    price: '$1,291,000',
    location: 'California, USA',
    image: 'https://source.unsplash.com/600x400/?house,modern,1',
  },
  {
    id: '2',
    title: 'Urban Apartment',
    price: '$891,000',
    location: 'New York, USA',
    image: 'https://source.unsplash.com/600x400/?apartment,modern,2',
  },
  {
    id: '3',
    title: 'Cozy Country House',
    price: '$691,000',
    location: 'Texas, USA',
    image: 'https://source.unsplash.com/600x400/?house,country,3',
  },
];

export default function Home() {
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
              <form className="d-flex justify-content-center mt-4">
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
            {/* <button className="btn btn-outline-primary">View all properties</button> */}
            <Link to="/properties" className="btn btn-outline-primary">
  View all properties
</Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {demoProperties.map((property) => (
              <div className="col" key={property.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={property.image}
                    className="card-img-top"
                    alt={property.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{property.price}</h5>
                    <p className="card-text text-muted mb-1">
                      {property.location}
                    </p>
                    <Link
                      to={`/property/${property.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      See details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
