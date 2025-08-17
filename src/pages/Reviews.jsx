import React, { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Rajesh Shrestha",
    avatar: "https://ui-avatars.com/api/?name=Rajesh+Shrestha&background=007bff&color=fff",
    time: "2 days ago",
    rating: 5,
    property: "Cozy Room in Thamel, Kathmandu",
    text: "Excellent room with great facilities. The owner is very responsive and helpful. Highly recommended for anyone looking for accommodation in Thamel area.",
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    name: "Sita Gurung",
    avatar: "https://ui-avatars.com/api/?name=Sita+Gurung&background=28a745&color=fff",
    time: "1 week ago",
    rating: 4,
    property: "Modern Apartment in Lalitpur",
    text: "Very clean and well-maintained apartment. Good location with easy access to public transport. The only minor issue was the wifi speed, but overall great experience.",
    helpful: 8,
    verified: true
  },
  {
    id: 3,
    name: "Arjun Tamang",
    avatar: "https://ui-avatars.com/api/?name=Arjun+Tamang&background=dc3545&color=fff",
    time: "2 weeks ago",
    rating: 5,
    property: "Single Room near Ratna Park",
    text: "Perfect room for a single person. Very affordable and the owner is understanding. Great location for office workers in the city center.",
    helpful: 15,
    verified: false
  },
  {
    id: 4,
    name: "Maya Thapa",
    avatar: "https://ui-avatars.com/api/?name=Maya+Thapa&background=6f42c1&color=fff",
    time: "3 weeks ago",
    rating: 4,
    property: "Shared Room in New Baneshwor",
    text: "Good value for money. The shared facilities are well-maintained and the roommates are friendly. Would definitely recommend for students.",
    helpful: 6,
    verified: true
  },
  {
    id: 5,
    name: "Kiran Maharjan",
    avatar: "https://ui-avatars.com/api/?name=Kiran+Maharjan&background=fd7e14&color=fff",
    time: "1 month ago",
    rating: 5,
    property: "Studio Apartment in Pokhara",
    text: "Amazing studio with beautiful mountain views. Perfect for digital nomads or anyone who wants to work remotely from Pokhara. Highly recommended!",
    helpful: 20,
    verified: true
  },
];

export default function Reviews() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Calculate review stats
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: Math.round((reviews.filter(r => r.rating === rating).length / totalReviews) * 100)
  }));

  const filteredReviews = reviews
    .filter(review => {
      switch (filter) {
        case "verified": return review.verified;
        case "5-star": return review.rating === 5;
        case "4-star": return review.rating === 4;
        case "3-star": return review.rating === 3;
        default: return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest": return new Date(a.time) - new Date(b.time);
        case "rating-high": return b.rating - a.rating;
        case "rating-low": return a.rating - b.rating;
        case "helpful": return b.helpful - a.helpful;
        default: return new Date(b.time) - new Date(a.time);
      }
    });

  const renderStars = (rating, size = "1rem") => {
    return (
      <div className="stars" style={{ fontSize: size }}>
        {[1, 2, 3, 4, 5].map(star => (
          <i
            key={star}
            className={`bi ${star <= rating ? 'bi-star-fill' : 'bi-star'} ${star <= rating ? 'text-warning' : 'text-muted'}`}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <div className="reviews-container fade-in-up">
      {/* Header */}
      <div className="reviews-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h2 fw-bold text-gradient mb-2">Reviews & Ratings</h1>
            <p className="text-muted mb-0">See what tenants say about your rooms</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Reviews Overview */}
        <div className="col-xl-4">
          <div className="reviews-stats-card fade-in-left">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-star me-2 text-warning"></i>
                Overall Rating
              </h5>
            </div>
            <div className="card-body text-center">
              <div className="overall-rating mb-3">
                <div className="rating-number">{averageRating}</div>
                <div className="rating-stars mb-2">
                  {renderStars(Math.round(parseFloat(averageRating)), "1.5rem")}
                </div>
                <p className="text-muted mb-0">Based on {totalReviews} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="rating-distribution">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="rating-bar-item d-flex align-items-center mb-2">
                    <span className="rating-label">{rating}</span>
                    <i className="bi bi-star-fill text-warning mx-2"></i>
                    <div className="rating-bar flex-grow-1 mx-2">
                      <div 
                        className="rating-bar-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="rating-count text-muted">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="col-xl-8">
          <div className="reviews-list-card fade-in-right">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <h5 className="card-title mb-0">
                  <i className="bi bi-chat-square-text me-2 text-primary"></i>
                  Recent Reviews ({filteredReviews.length})
                </h5>
                <div className="d-flex gap-2">
                  <select 
                    className="form-select form-select-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Reviews</option>
                    <option value="verified">Verified Only</option>
                    <option value="5-star">5 Star</option>
                    <option value="4-star">4 Star</option>
                    <option value="3-star">3 Star</option>
                  </select>
                  <select 
                    className="form-select form-select-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="rating-high">Highest Rating</option>
                    <option value="rating-low">Lowest Rating</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="reviews-list">
                {filteredReviews.length === 0 ? (
                  <div className="no-reviews text-center py-5">
                    <div className="no-reviews-icon mb-3">
                      <i className="bi bi-star fs-1 text-muted"></i>
                    </div>
                    <h5 className="text-muted mb-2">No reviews found</h5>
                    <p className="text-muted">Try adjusting your filters to see more reviews.</p>
                  </div>
                ) : (
                  filteredReviews.map((review, index) => (
                    <div 
                      key={review.id} 
                      className={`review-item fade-in-up ${index !== filteredReviews.length - 1 ? 'border-bottom' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="review-header">
                        <div className="d-flex align-items-start">
                          <div className="review-avatar me-3">
                            <img src={review.avatar} alt={review.name} />
                            {review.verified && (
                              <span className="verified-badge" title="Verified Reviewer">
                                <i className="bi bi-patch-check-fill"></i>
                              </span>
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <h6 className="review-name mb-1">
                                  {review.name}
                                  {review.verified && (
                                    <span className="verified-text ms-2">
                                      <i className="bi bi-patch-check text-success"></i>
                                      Verified
                                    </span>
                                  )}
                                </h6>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  {renderStars(review.rating)}
                                  <span className="review-time text-muted">{review.time}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="review-property mb-2">
                              <i className="bi bi-house me-1 text-primary"></i>
                              <small className="text-muted">{review.property}</small>
                            </div>
                            
                            <p className="review-text mb-3">{review.text}</p>
                            
                            <div className="review-actions d-flex align-items-center gap-3">
                              <button className="btn btn-link btn-sm p-0 text-muted">
                                <i className="bi bi-hand-thumbs-up me-1"></i>
                                Helpful ({review.helpful})
                              </button>
                              <button className="btn btn-link btn-sm p-0 text-muted">
                                <i className="bi bi-reply me-1"></i>
                                Reply
                              </button>
                              <button className="btn btn-link btn-sm p-0 text-muted">
                                <i className="bi bi-flag me-1"></i>
                                Report
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
