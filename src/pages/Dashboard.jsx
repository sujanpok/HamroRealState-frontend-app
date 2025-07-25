// src/pages/Dashboard.jsx

import React from 'react';
import Sidebar from '../components/Sidebar';

const dummyListings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Casa Lomas de Machalí Machas',
    date: 'March 22, 2024',
    price: '$4,498',
    status: 'Pending',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Casa Lomas de Machalí Machas',
    date: 'March 22, 2024',
    price: '$5,007',
    status: 'Approved',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    title: 'Casa Lomas de Machalí Machas',
    date: 'March 22, 2024',
    price: '$5,299',
    status: 'Sold',
  },
];

const dummyMessages = [
  {
    name: 'Themesflat',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    time: '3 days ago',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque vulputate tincidunt.',
  },
  {
    name: 'ThemeMu',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    time: '3 days ago',
    text: 'Nullam lacinia lorem id sapien suscipit, vitae pellentesque metus maximus.',
  },
  {
    name: 'Cameron Williamson',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    time: '4 days ago',
    text: 'In consequat lacus augue, a vestibulum est aliquam non.',
  },
  {
    name: 'Esther Howard',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: '5 days ago',
    text: 'Cras congue in justo vel dapibus. Praesent euismod, lectus et aliquam pretium.',
  },
];

export default function Dashboard() {
  // You may receive onLogout as a prop, or handle logout globally in App.jsx
  const handleLogout = () => {
    // Add your logout logic here if needed
    window.location.href = '/';
  };

  return (
    <div className="d-flex">
      {/* Sidebar: Rendered only if user is logged in and on dashboard route (handled in App.jsx) */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-grow-1" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <div className="container py-4">
          {/* Summary Cards */}
          <div className="row g-4 mb-4">
            <div className="col-6 col-md-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <div className="fs-2 fw-bold text-primary">32</div>
                  <div className="text-muted">Your Listings</div>
                  <div className="small text-muted">18 remaining</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <div className="fs-2 fw-bold text-warning">02</div>
                  <div className="text-muted">Pending</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <div className="fs-2 fw-bold text-info">06</div>
                  <div className="text-muted">Favourites</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <div className="fs-2 fw-bold text-success">1,483</div>
                  <div className="text-muted">Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Example Chart Widget */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">Visits Overview</h5>
                  {/* Insert your chart component here */}
                  <div className="bg-light rounded p-5 text-center text-muted">[Chart Widget Placeholder]</div>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Table and Messages */}
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">New Listings</h5>
                </div>
                <div className="card-body p-0">
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Listing</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyListings.map((listing) => (
                        <tr key={listing.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={listing.image}
                                alt={listing.title}
                                className="rounded me-3"
                                style={{ width: 60, height: 40, objectFit: 'cover' }}
                              />
                              <div>
                                <div className="fw-bold">{listing.title}</div>
                                <div className="small text-muted">
                                  Posted {listing.date} <span className="ms-2 text-primary">{listing.price}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {listing.status === 'Pending' && (
                              <span className="badge bg-warning text-dark">Pending</span>
                            )}
                            {listing.status === 'Approved' && (
                              <span className="badge bg-success">Approved</span>
                            )}
                            {listing.status === 'Sold' && (
                              <span className="badge bg-secondary">Sold</span>
                            )}
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-danger me-1">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Messages</h5>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {dummyMessages.map((msg, idx) => (
                      <li className="list-group-item d-flex align-items-start" key={idx}>
                        <img
                          src={msg.avatar}
                          alt={msg.name}
                          className="rounded-circle me-3"
                          style={{ width: 40, height: 40, objectFit: 'cover' }}
                        />
                        <div>
                          <div className="fw-bold">{msg.name}</div>
                          <div className="small text-muted mb-1">{msg.time}</div>
                          <div className="small">{msg.text}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* End Main Content */}
    </div>
  );
}
