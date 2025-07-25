import React from "react";

const reviews = [
  {
    id: 1,
    name: "Bessie Cooper",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    time: "3 days ago",
    text: "Maecenas eu lorem et urna accumsan vestibulum vel vitae magna.",
  },
  {
    id: 2,
    name: "Annette Black",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    time: "3 days ago",
    text: "Nullam rhoncus dolor arcu, et commodo tellus semper vitae. Aenean finibus tristique lectus, ac lobortis mauris venenatis ac.",
  },
  {
    id: 3,
    name: "Ralph Edwards",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    time: "3 days ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra semper convallis. Integer vestibulum tempus tincidunt.",
  },
  {
    id: 4,
    name: "Jerome Bell",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    time: "3 days ago",
    text: "Fusce sit amet purus eget quam eleifend hendrerit nec a erat. Sed turpis neque, iaculis blandit viverra ut, dapibus eget nisi.",
  },
  {
    id: 5,
    name: "Albert Flores",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
    time: "3 days ago",
    text: "Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum. Fusce at dui tincidunt nulla semper venenatis at et magna. Mauris turpis lorem, ultricies vel justo sed.",
  },
];

export default function Reviews() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Recent Reviews</h5>
        </div>
        <ul className="list-group list-group-flush">
          {reviews.map((review) => (
            <li className="list-group-item d-flex align-items-start py-4" key={review.id}>
              <img
                src={review.avatar}
                alt={review.name}
                className="rounded-circle me-3 flex-shrink-0"
                style={{ width: 54, height: 54, objectFit: "cover" }}
              />
              <div>
                <div className="fw-bold">{review.name}</div>
                <div className="small text-muted mb-1">{review.time}</div>
                <div>{review.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
