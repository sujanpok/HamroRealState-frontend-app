import React, { useState } from "react";

const allProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$4,498",
    status: "Pending",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$5,007",
    status: "Approved",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$5,329",
    status: "Sold",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$3,882",
    status: "Pending",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$2,895",
    status: "Sold",
  },
];

const statusOptions = ["All", "Pending", "Approved", "Sold"];

export default function MyProperties() {
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allProperties.filter(
    (p) =>
      (status === "All" || p.status === status) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white d-flex flex-column flex-md-row align-items-md-center justify-content-between">
        <h5 className="mb-2 mb-md-0">My Properties</h5>
        <div className="d-flex flex-wrap gap-2">
          <select
            className="form-select form-select-sm"
            style={{ width: 130 }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option value={opt} key={opt}>
                {opt === "All" ? "Post Status: All" : opt}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control form-control-sm"
            style={{ width: 180 }}
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Listing</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-muted">
                    No properties found.
                  </td>
                </tr>
              )}
              {filtered.map((property) => (
                <tr key={property.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="rounded me-3"
                        style={{ width: 60, height: 40, objectFit: "cover" }}
                      />
                      <div>
                        <div className="fw-bold">{property.title}</div>
                        <div className="small text-muted">
                          Posting date: {property.postingDate}
                          <span className="ms-2 text-primary">{property.price}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {property.status === "Pending" && (
                      <span className="badge bg-warning text-dark">Pending</span>
                    )}
                    {property.status === "Approved" && (
                      <span className="badge bg-success">Approved</span>
                    )}
                    {property.status === "Sold" && (
                      <span className="badge bg-secondary">Sold</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                    <button className="btn btn-sm btn-outline-secondary me-1">Sold</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination (demo only) */}
        <nav className="mt-3">
          <ul className="pagination justify-content-end mb-0">
            <li className="page-item"><button className="page-link">1</button></li>
            <li className="page-item"><button className="page-link">2</button></li>
            <li className="page-item"><button className="page-link">3</button></li>
            <li className="page-item"><button className="page-link">4</button></li>
            <li className="page-item disabled"><span className="page-link">...</span></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
