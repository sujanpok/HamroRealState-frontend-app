/* ─────────────────────────────────────────────────────────
   AllProperties.jsx
   • Search box + location filter
   • Client-side pagination (6 cards per page)
   • Animated cards (fade-in, hover-lift)
   • Dark-mode ready – uses your Bootstrap/CSS vars
   ───────────────────────────────────────────────────────── */
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

/* demo dataset */
const DATA = [
  {
    id: '1',
    title: 'Modern Family Home',
    price: '$1,291,000',
    location: 'California, USA',
    image: 'https://source.unsplash.com/600x400/?house,modern'
  },
  {
    id: '2',
    title: 'Urban Apartment',
    price: '$891,000',
    location: 'New York, USA',
    image: 'https://source.unsplash.com/600x400/?apartment,loft'
  },
  {
    id: '3',
    title: 'Cozy Country House',
    price: '$691,000',
    location: 'Texas, USA',
    image: 'https://source.unsplash.com/600x400/?house,country'
  },
  {
    id: '4',
    title: 'Luxury Villa',
    price: '$2,200,000',
    location: 'Miami, USA',
    image: 'https://source.unsplash.com/600x400/?villa,luxury'
  },
  {
    id: '5',
    title: 'City Loft',
    price: '$1,100,000',
    location: 'Chicago, USA',
    image: 'https://source.unsplash.com/600x400/?loft,city'
  },
  {
    id: '6',
    title: 'Beach House',
    price: '$1,800,000',
    location: 'Los Angeles, USA',
    image: 'https://source.unsplash.com/600x400/?beach,house'
  },
  {
    id: '7',
    title: 'Country Cottage',
    price: '$620,000',
    location: 'Vermont, USA',
    image: 'https://source.unsplash.com/600x400/?cottage'
  },
  {
    id: '8',
    title: 'Modern Condo',
    price: '$850,000',
    location: 'Seattle, USA',
    image: 'https://source.unsplash.com/600x400/?condo,modern'
  },
  {
    id: '9',
    title: 'Suburban House',
    price: '$780,000',
    location: 'Austin, USA',
    image: 'https://source.unsplash.com/600x400/?house,suburban'
  }
];

/* card */
const PropertyCard = ({ prop, delay }) => (
  <div className="col" style={{ animationDelay: `${delay}s` }}>
    <div className="card h-100 shadow-sm hover-lift fade-in-up">
      <img
        src={prop.image}
        alt={prop.title}
        loading="lazy"
        className="card-img-top"
        style={{ height: 220, objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{prop.title}</h5>
        <p className="text-primary fw-bold mb-1">{prop.price}</p>
        <p className="text-muted flex-grow-1 mb-3">{prop.location}</p>

        <Link
          to={`/property/${prop.id}`}
          className="btn btn-outline-primary mt-auto"
          aria-label={`See details of ${prop.title}`}
        >
          See details
        </Link>
      </div>
    </div>
  </div>
);

export default function AllProperties() {
  /* search, filter, page state */
  const [query, setQuery] = useState('');
  const [loc, setLoc] = useState('All');
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  /* derive location list */
  const locations = useMemo(
    () => ['All', ...Array.from(new Set(DATA.map((d) => d.location)))],
    []
  );

  /* filtered list */
  const filtered = useMemo(() => {
    return DATA.filter(
      (p) =>
        (loc === 'All' || p.location === loc) &&
        p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [loc, query]);

  /* pagination math */
  const pages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goto = (p) => {
    if (p < 1 || p > pages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold text-gradient text-center mb-4">
          All Properties
        </h2>

        {/* search + location filter */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <input
              type="search"
              className="form-control"
              placeholder="Search properties…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              aria-label="Search properties"
            />
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={loc}
              onChange={(e) => {
                setLoc(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by location"
            >
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* card grid */}
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
          {current.map((p, i) => (
            <PropertyCard key={p.id} prop={p} delay={i * 0.08} />
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-muted">No properties found.</p>
          )}
        </div>

        {/* pagination */}
        {pages > 1 && (
          <nav aria-label="Property pages">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goto(page - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(pages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => goto(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goto(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}

/*  OPTIONAL CSS (add once globally)
.fade-in-up      { animation: fadeUp 0.35s ease forwards; }
@keyframes fadeUp{ from{opacity:0; transform:translateY(18px);}
                   to  {opacity:1; transform:translateY(0);} }
.hover-lift:hover{ transform:translateY(-6px);
                   box-shadow:0 12px 30px var(--shadow); }
*/
