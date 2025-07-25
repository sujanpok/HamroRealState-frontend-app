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
  {
    id: '4',
    title: 'Luxury Villa',
    price: '$2,200,000',
    location: 'Miami, USA',
    image: 'https://source.unsplash.com/600x400/?villa,luxury,4',
  },
  {
    id: '5',
    title: 'City Loft',
    price: '$1,100,000',
    location: 'Chicago, USA',
    image: 'https://source.unsplash.com/600x400/?loft,city,5',
  },
  {
    id: '6',
    title: 'Beach House',
    price: '$1,800,000',
    location: 'Los Angeles, USA',
    image: 'https://source.unsplash.com/600x400/?beach,house,6',
  },
];

export default function AllProperties() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold mb-4 text-center">All Properties</h2>
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
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text text-primary fw-bold">{property.price}</p>
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
  );
}
