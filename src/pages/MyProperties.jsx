import React, { useState, useMemo } from "react";
import { Link } from 'react-router-dom';

const allProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    title: "Cozy Room in Thamel, Kathmandu",
    postingDate: "March 22, 2024",
    price: "NPR 8,500",
    status: "Pending",
    views: 234,
    inquiries: 12,
    type: "Single Room"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
    title: "Modern Apartment in Lalitpur",
    postingDate: "March 22, 2024",
    price: "NPR 15,000",
    status: "Approved",
    views: 456,
    inquiries: 23,
    type: "Apartment"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    title: "Single Room near Ratna Park",
    postingDate: "March 22, 2024",
    price: "NPR 6,000",
    status: "Rented",
    views: 189,
    inquiries: 8,
    type: "Single Room"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    title: "Shared Room in New Baneshwor",
    postingDate: "March 22, 2024",
    price: "NPR 4,500",
    status: "Pending",
    views: 123,
    inquiries: 5,
    type: "Shared Room"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop",
    title: "Studio Apartment in Pokhara",
    postingDate: "March 22, 2024",
    price: "NPR 12,000",
    status: "Rented",
    views: 78,
    inquiries: 3,
    type: "Studio"
  },
];

const statusOptions = ["All", "Pending", "Approved", "Rented"];
const typeOptions = ["All Types", "Single Room", "Shared Room", "Apartment", "Studio"];

export default function MyProperties() {
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All Types");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = allProperties.filter((p) =>
      (status === "All" || p.status === status) &&
      (type === "All Types" || p.type === type) &&
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    // Sort properties
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.postingDate) - new Date(b.postingDate));
      case 'price-high':
        return filtered.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
      case 'price-low':
        return filtered.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
      case 'views':
        return filtered.sort((a, b) => b.views - a.views);
      default:
        return filtered;
    }
  }, [status, type, search, sortBy]);

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
    <div className="my-properties-container fade-in-up">
      {/* Header */}
      <div className="properties-header mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h1 className="h2 fw-bold text-gradient mb-2">My Room Listings</h1>
            <p className="text-muted mb-0">Manage and track your room listings</p>
          </div>
          <Link to="/add-property" className="btn btn-primary btn-animated">
            <i className="bi bi-plus-lg me-2"></i>Add New Room
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="properties-filters mb-4">
        <div className="filter-card p-3 rounded-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-search me-1"></i>Search Rooms
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-semibold">
                <i className="bi bi-funnel me-1"></i>Status
              </label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-semibold">
                <i className="bi bi-house me-1"></i>Type
              </label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-semibold">
                <i className="bi bi-sort-down me-1"></i>Sort By
              </label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={() => {
                  setStatus("All");
                  setType("All Types");
                  setSearch("");
                  setSortBy("newest");
                }}>
                  <i className="bi bi-arrow-clockwise me-1"></i>Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      {filteredAndSortedProperties.length === 0 ? (
        <div className="no-properties text-center py-5">
          <div className="no-properties-icon mb-3">
            <i className="bi bi-house-slash fs-1 text-muted"></i>
          </div>
          <h4 className="text-muted mb-3">No rooms found</h4>
          <p className="text-muted mb-4">
            {search || status !== "All" || type !== "All Types" 
              ? "Try adjusting your filters to see more results." 
              : "You haven't listed any rooms yet."}
          </p>
          <Link to="/add-property" className="btn btn-primary btn-animated">
            <i className="bi bi-plus-lg me-2"></i>Add Your First Room
          </Link>
        </div>
      ) : (
        <>
          {/* Results Summary */}
          <div className="results-summary mb-3">
            <p className="text-muted mb-0">
              Showing {filteredAndSortedProperties.length} of {allProperties.length} rooms
            </p>
          </div>

          {/* Properties Grid */}
          <div className="properties-grid">
            <div className="row g-4">
              {filteredAndSortedProperties.map((property, index) => (
                <div key={property.id} className="col-lg-4 col-md-6 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="property-card h-100 hover-lift">
                    <div className="property-image-container">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="property-image"
                      />
                      <div className="property-overlay">
                        {getStatusBadge(property.status)}
                        <div className="property-actions">
                          <button className="btn btn-light btn-sm" title="Edit">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-light btn-sm" title="Duplicate">
                            <i className="bi bi-files"></i>
                          </button>
                          <button className="btn btn-danger btn-sm" title="Delete">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="property-content p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="property-title mb-0">{property.title}</h5>
                        <span className="property-type-badge">{property.type}</span>
                      </div>
                      
                      <div className="property-price mb-2">
                        <span className="fw-bold text-primary">{property.price}</span>
                        <small className="text-muted">/month</small>
                      </div>

                      <div className="property-stats mb-3">
                        <div className="row g-2 text-center">
                          <div className="col-4">
                            <div className="stat-item">
                              <i className="bi bi-eye text-primary"></i>
                              <small className="d-block">{property.views} views</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="stat-item">
                              <i className="bi bi-chat-dots text-success"></i>
                              <small className="d-block">{property.inquiries} inquiries</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="stat-item">
                              <i className="bi bi-calendar text-info"></i>
                              <small className="d-block">Posted {property.postingDate}</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="property-actions-bottom d-flex gap-2">
                        <Link 
                          to={`/property/${property.id}`}
                          className="btn btn-outline-primary btn-sm flex-fill"
                        >
                          <i className="bi bi-eye me-1"></i>View
                        </Link>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
