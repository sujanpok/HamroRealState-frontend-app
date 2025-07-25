import React from "react";

const favoriteProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$4,498",
    status: "Sold",
    lastAction: "April 10, 2024",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$5,007",
    status: "Sold",
    lastAction: "April 10, 2024",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$5,329",
    status: "Sold",
    lastAction: "April 10, 2024",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$3,882",
    status: "Sold",
    lastAction: "April 10, 2024",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    title: "Casa Lomas de Machalí Machas",
    postingDate: "March 22, 2024",
    price: "$2,895",
    status: "Sold",
    lastAction: "April 10, 2024",
  },
];

export default function MyFavorites() {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">My Favorites</h5>
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
              {favoriteProperties.map((property) => (
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
                        <div className="small text-muted">
                          {property.lastAction}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{property.status}</span>
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
