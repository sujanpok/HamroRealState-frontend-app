import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';

const dummyListings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    title: 'Cozy Room in Thamel, Kathmandu',
    date: 'March 22, 2024',
    price: 'NPR 8,500',
    status: 'Pending',
    views: 234,
    inquiries: 12
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    title: 'Modern Apartment in Lalitpur',
    date: 'March 22, 2024',
    price: 'NPR 15,000',
    status: 'Approved',
    views: 456,
    inquiries: 23
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    title: 'Single Room near Ratna Park',
    date: 'March 22, 2024',
    price: 'NPR 6,000',
    status: 'Rented',
    views: 189,
    inquiries: 8
  },
];

const dummyMessages = [
  {
    id: 1,
    name: 'Rajesh Shrestha',
    avatar: 'https://ui-avatars.com/api/?name=Rajesh+Shrestha&background=007bff&color=fff',
    time: '2 hours ago',
    text: 'Hello, I am interested in your room in Thamel. Is it still available?',
    unread: true,
    property: 'Cozy Room in Thamel'
  },
  {
    id: 2,
    name: 'Sita Gurung',
    avatar: 'https://ui-avatars.com/api/?name=Sita+Gurung&background=28a745&color=fff',
    time: '5 hours ago',
    text: 'Can we schedule a visit for the apartment in Lalitpur?',
    unread: true,
    property: 'Modern Apartment in Lalitpur'
  },
  {
    id: 3,
    name: 'Arjun Tamang',
    avatar: 'https://ui-avatars.com/api/?name=Arjun+Tamang&background=dc3545&color=fff',
    time: '1 day ago',
    text: 'Thank you for showing me the room. I will let you know soon.',
    unread: false,
    property: 'Single Room near Ratna Park'
  }
];

export default function Dashboard() {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0
  });

  useEffect(() => {
    // Calculate stats from dummy data
    const totalListings = dummyListings.length;
    const activeListings = dummyListings.filter(l => l.status !== 'Rented').length;
    const totalViews = dummyListings.reduce((sum, l) => sum + l.views, 0);
    const totalInquiries = dummyListings.reduce((sum, l) => sum + l.inquiries, 0);

    setStats({ totalListings, activeListings, totalViews, totalInquiries });
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { class: 'warning', icon: 'bi-clock' },
      'Approved': { class: 'success', icon: 'bi-check-circle' },
      'Rented': { class: 'info', icon: 'bi-house-check' }
    };
    
    const config = statusConfig[status] || { class: 'secondary', icon: 'bi-question' };
    
    return (
      <span className={`badge bg-${config.class} d-inline-flex align-items-center gap-1`}>
        <i className={`bi ${config.icon}`}></i>
        {status}
      </span>
    );
  };

  return (
    <div className="dashboard-container fade-in-up">
      {/* Dashboard Header */}
      <div className="dashboard-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h2 fw-bold text-gradient mb-2">Dashboard</h1>
            <p className="text-muted mb-0">Welcome back! Here's what's happening with your rooms.</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/add-property" className="btn btn-primary btn-animated">
              <i className="bi bi-plus-lg me-2"></i>Add New Room
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {[
          {
            title: 'Total Rooms',
            value: stats.totalListings,
            icon: 'bi-house',
            color: 'primary',
            change: '+2 this month'
          },
          {
            title: 'Active Listings',
            value: stats.activeListings,
            icon: 'bi-eye',
            color: 'success',
            change: 'Currently available'
          },
          {
            title: 'Total Views',
            value: stats.totalViews.toLocaleString(),
            icon: 'bi-graph-up',
            color: 'info',
            change: '+15% this week'
          },
          {
            title: 'Inquiries',
            value: stats.totalInquiries,
            icon: 'bi-chat-dots',
            color: 'warning',
            change: '3 new today'
          }
        ].map((stat, index) => (
          <div key={index} className="col-xl-3 col-md-6 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stats-card hover-lift">
              <div className="stats-icon-container">
                <div className={`stats-icon bg-${stat.color} bg-gradient`}>
                  <i className={`bi ${stat.icon}`}></i>
                </div>
              </div>
              <div className="stats-content">
                <h3 className="stats-value">{stat.value}</h3>
                <p className="stats-title">{stat.title}</p>
                <small className="stats-change text-muted">{stat.change}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Recent Listings */}
        <div className="col-xl-8">
          <div className="dashboard-card fade-in-left">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <i className="bi bi-house-gear me-2 text-primary"></i>
                Recent Room Listings
              </h5>
              <Link to="/my-properties" className="btn btn-outline-primary btn-sm">
                View All
              </Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Status</th>
                      <th>Views</th>
                      <th>Inquiries</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyListings.map((listing, index) => (
                      <tr key={listing.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="room-image-container me-3">
                              <img
                                src={listing.image}
                                alt={listing.title}
                                className="room-thumbnail"
                              />
                            </div>
                            <div>
                              <h6 className="mb-1 fw-semibold">{listing.title}</h6>
                              <p className="mb-1 text-primary fw-semibold">{listing.price}/month</p>
                              <small className="text-muted">Posted {listing.date}</small>
                            </div>
                          </div>
                        </td>
                        <td>{getStatusBadge(listing.status)}</td>
                        <td>
                          <span className="d-inline-flex align-items-center">
                            <i className="bi bi-eye me-1 text-muted"></i>
                            {listing.views}
                          </span>
                        </td>
                        <td>
                          <span className="d-inline-flex align-items-center">
                            <i className="bi bi-chat-dots me-1 text-muted"></i>
                            {listing.inquiries}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/property/${listing.id}`}
                              className="btn btn-outline-primary btn-sm"
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <button 
                              className="btn btn-outline-secondary btn-sm"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="col-xl-4">
          <div className="dashboard-card fade-in-right">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <i className="bi bi-chat-dots me-2 text-primary"></i>
                Recent Messages
              </h5>
              <Link to="/messages" className="btn btn-outline-primary btn-sm">
                View All
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="message-list">
                {dummyMessages.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`message-item ${message.unread ? 'unread' : ''} fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="message-avatar">
                      <img src={message.avatar} alt={message.name} />
                      {message.unread && <span className="unread-indicator"></span>}
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <h6 className="message-name">{message.name}</h6>
                        <small className="message-time">{message.time}</small>
                      </div>
                      <p className="message-text">{message.text}</p>
                      <small className="message-property">
                        <i className="bi bi-house me-1"></i>
                        {message.property}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-3 mt-4">
        <div className="col-12">
          <div className="dashboard-card fade-in-up">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-lightning me-2 text-primary"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {[
                  { title: 'Add New Room', icon: 'bi-plus-square', color: 'primary', link: '/add-property' },
                  { title: 'View Messages', icon: 'bi-chat-text', color: 'success', link: '/messages' },
                  { title: 'Check Reviews', icon: 'bi-star', color: 'warning', link: '/reviews' },
                  { title: 'Update Profile', icon: 'bi-person-gear', color: 'info', link: '/profile' }
                ].map((action, index) => (
                  <div key={index} className="col-xl-3 col-md-6">
                    <Link to={action.link} className="quick-action-card hover-lift text-decoration-none">
                      <div className={`quick-action-icon bg-${action.color} bg-gradient`}>
                        <i className={`bi ${action.icon}`}></i>
                      </div>
                      <h6 className="quick-action-title">{action.title}</h6>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
