/* ─────────────────────────────────────────────────────────
   MyFavorites.jsx
   • Modernized table with smooth “fade-in-up” rows
   • Dark-mode ready (Bootstrap + your CSS variables)
   • Inline delete demo (removes from state)
   • Status badge auto-colors (Available / Pending / Sold / Draft)
   • Uses react-icons for crisp action buttons
   ───────────────────────────────────────────────────────── */
import React, { useState } from 'react';
import { BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';

/* dummy seed */
const seedFavorites = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Casa Lomas de Machalí Machas',
    postingDate: 'Mar 22 2024',
    price: '$4,498',
    status: 'Sold',
    lastAction: 'Apr 10 2024'
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Minimalist Lake-House',
    postingDate: 'Apr 06 2024',
    price: '$5,007',
    status: 'Pending',
    lastAction: 'Apr 11 2024'
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    title: 'Urban Loft Downtown',
    postingDate: 'Apr 19 2024',
    price: '$5,329',
    status: 'Available',
    lastAction: 'Apr 22 2024'
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    title: 'Beachfront Bungalow',
    postingDate: 'May 01 2024',
    price: '$3,882',
    status: 'Draft',
    lastAction: 'May 02 2024'
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Mountain Retreat Cabin',
    postingDate: 'May 15 2024',
    price: '$2,895',
    status: 'Sold',
    lastAction: 'May 30 2024'
  }
];

/* util: badge color */
const badgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'available':
      return 'success';
    case 'pending':
      return 'warning';
    case 'draft':
      return 'info';
    case 'sold':
    default:
      return 'secondary';
  }
};

/* ───────────  component  ─────────── */
export default function MyFavorites() {
  const [items, setItems] = useState(seedFavorites);

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="card shadow-sm fade-in-up mb-4">
      {/* header */}
      <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <h5 className="mb-0">My Favorites</h5>
        <span className="badge bg-light text-dark">{items.length}</span>
      </div>

      {/* table */}
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light text-nowrap">
            <tr>
              <th>Listing</th>
              <th className="text-center">Status</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="fade-in-up">
                {/* listing */}
                <td>
                  <div className="d-flex align-items-start gap-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="rounded"
                      width={64}
                      height={48}
                      style={{ objectFit: 'cover' }}
                    />

                    <div>
                      <h6 className="fw-bold mb-1">{p.title}</h6>
                      <small className="text-muted d-block">
                        Posted&nbsp;{p.postingDate}
                        <span className="ms-2 text-primary">{p.price}</span>
                      </small>
                      <small className="text-muted">
                        Last action: {p.lastAction}
                      </small>
                    </div>
                  </div>
                </td>

                {/* status */}
                <td className="text-center">
                  <span
                    className={`badge bg-${badgeVariant(p.status)}`}
                  >
                    {p.status}
                  </span>
                </td>

                {/* actions */}
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-secondary me-1"
                    title="View"
                  >
                    <BsEye />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-1"
                    title="Edit"
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Delete"
                    onClick={() => remove(p.id)}
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}

            {/* empty-state */}
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-5">
                  <p className="text-muted mb-0">
                    No favorites yet ― start adding properties!
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination (static demo) */}
      <nav className="p-3 pt-2 border-top text-end">
        <ul className="pagination pagination-sm mb-0 justify-content-end">
          <li className="page-item">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
          <li className="page-item">
            <button className="page-link">3</button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">…</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/*  CSS (add once if not present)
.fade-in-up        { animation: fadeUp 0.4s ease forwards; }
@keyframes fadeUp  { from {opacity:0; transform:translateY(15px);}
                     to   {opacity:1; transform:translateY(0);} }
*/
