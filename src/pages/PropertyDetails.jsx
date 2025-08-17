/* ─────────────────────────────────────────────────────────
   PropertyDetails.jsx
   • Modern gallery (keyboard arrows + swipe via pointer)
   • Dark-mode ready (Bootstrap + your CSS variables)
   • Skeleton loader while fetching
   • Graceful 404 + back navigation
   • Image / video helpers improved (accepts query strings)
   • Dummy “Chat” + “Book Visit” buttons
   • No extra dependencies
   ───────────────────────────────────────────────────────── */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_ROOM_MICROSRVICES_URL;
const PLACEHOLDER =
  'https://placeholdit.com/600x400/8ebbda/9e9cd8?text=loading...&font=cairo';

/* — helpers — */
const isVideo = (url = '') =>
  /\.(mp4|webm|ogg)(\?.*)?$/i.test(url.split('?')[0]);

const isImage = (url = '') =>
  /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i.test(url.split('?')[0]);

const gDriveToDirect = (url = '') => {
  const m = url.match(/\/file\/d\/([^/]+)\//);
  return m ? `https://drive.google.com/uc?export=view&id=${m[1]}` : url;
};

/* — skeleton boxes — */
const Skeleton = ({ h = 200 }) => (
  <div
    className="bg-light-subtle w-100 rounded mb-3 shimmer"
    style={{ height: h }}
  />
);

/* — component — */
export default function PropertyDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [data, setData] = useState(null);
  const [ix, setIx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const swipeRef = useRef(null); // for pointer swipe on mobile

  /* fetch */
  useEffect(() => {
    let live = true;
    setLoading(true);
    fetch(`${API_BASE}/properties/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Property not found');
        return r.json();
      })
      .then((json) => live && setData(json))
      .catch((e) => live && setErr(e.message))
      .finally(() => live && setLoading(false));
    return () => (live = false);
  }, [id]);

  /* media list (always ≥1) */
  const media = (data?.image_objs || []).map((o) => ({
    url: gDriveToDirect(o.file_url),
    isVideo: isVideo(o.file_url),
    isImage: isImage(o.file_url)
  }));
  if (media.length === 0)
    media.push({ url: PLACEHOLDER, isImage: true, isVideo: false });

  const show = media[ix];

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const prev = () =>
    setIx((i) => (i === 0 ? media.length - 1 : i - 1));
  const next = () => setIx((i) => (i + 1) % media.length);

  /* pointer swipe (mobile) */
  useEffect(() => {
    const box = swipeRef.current;
    if (!box) return;
    let startX = 0;
    const down = (e) => (startX = e.clientX);
    const up = (e) => {
      if (!startX) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 60) (dx > 0 ? prev : next)();
      startX = 0;
    };
    box.addEventListener('pointerdown', down);
    box.addEventListener('pointerup', up);
    return () => {
      box.removeEventListener('pointerdown', down);
      box.removeEventListener('pointerup', up);
    };
  }, [media]);

  /* — render — */
  if (loading)
    return (
      <section className="container py-5">
        <Skeleton h={400} />
        <Skeleton h={120} />
      </section>
    );

  if (err || !data)
    return (
      <section className="container py-5 text-center">
        <h2 className="mb-4 text-danger">{err || 'Not found'}</h2>
        <button className="btn btn-primary" onClick={() => nav(-1)}>
          Back
        </button>
      </section>
    );

  const {
    TITLE,
    PRICE,
    LOCATION,
    CITY,
    PROPERTY_TYPE,
    DESCRIPTION,
    uploader_profile_image,
    uploader_name,
    uploader_email,
    uploader_type
  } = data;

  const priceText =
    PRICE && Number(PRICE) > 0
      ? `$${Number(PRICE).toLocaleString()}`
      : 'Price on request';

  const uploaderImg =
    uploader_profile_image ||
    'https://randomuser.me/api/portraits/men/32.jpg';

  /* ---------------------------------------------------- */
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* gallery */}
        <div className="row g-4 mb-4 align-items-start">
          <div className="col-lg-7">
            {/* main media */}
            <div
              ref={swipeRef}
              className="position-relative rounded shadow-sm overflow-hidden bg-dark"
              style={{ maxHeight: 420 }}
            >
              {media.length > 1 && (
                <>
                  <button
                    className="btn btn-outline-light position-absolute top-50 start-0 translate-middle-y"
                    style={{ zIndex: 2 }}
                    onClick={prev}
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    className="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y"
                    style={{ zIndex: 2 }}
                    onClick={next}
                    aria-label="Next"
                  >
                    ›
                  </button>
                </>
              )}

              {show.isVideo ? (
                <video
                  controls
                  className="w-100 d-block"
                  style={{ maxHeight: 420, objectFit: 'contain' }}
                >
                  <source src={show.url} />
                </video>
              ) : (
                <img
                  src={show.url}
                  alt={`media-${ix + 1}`}
                  className="w-100"
                  style={{ maxHeight: 420, objectFit: 'contain' }}
                />
              )}
            </div>

            {/* thumbs */}
            {media.length > 1 && (
              <div className="d-flex flex-wrap gap-2 mt-2 justify-content-center">
                {media.map((m, i) => (
                  <div
                    key={i}
                    onClick={() => setIx(i)}
                    role="button"
                    className={`border ${
                      i === ix ? 'border-primary' : 'border-light'
                    } rounded overflow-hidden`}
                    style={{ width: 72, height: 54, cursor: 'pointer' }}
                  >
                    {m.isVideo ? (
                      <video
                        src={m.url}
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                        muted
                      />
                    ) : (
                      <img
                        src={m.url}
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* summary */}
          <div className="col-lg-5">
            <h1 className="fw-bold">{TITLE}</h1>
            <h3 className="text-primary mb-3">{priceText}</h3>

            <p className="mb-2 text-muted">
              <i className="bi bi-geo-alt me-1" /> {LOCATION}, {CITY}
            </p>
            <p className="mb-4">
              <strong>Type:</strong> {PROPERTY_TYPE}
            </p>

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-primary">Book a Visit</button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => nav(-1)}
              >
                Back to Listings
              </button>
            </div>
          </div>
        </div>

        {/* description & uploader */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Property Description</h4>
                <p className="mb-0">
                  {DESCRIPTION || 'No description provided.'}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <img
                  src={uploaderImg}
                  alt={uploader_name || 'uploader'}
                  className="rounded-circle mb-3"
                  width={90}
                  height={90}
                  style={{ objectFit: 'cover' }}
                />
                <h5 className="fw-bold mb-1">
                  {uploader_name || 'Unknown'}
                </h5>
                <div className="text-muted mb-2">
                  {uploader_type || 'User'}
                </div>

                <p className="small mb-3">
                  <i className="bi bi-envelope me-1" />
                  {uploader_email ? (
                    <a href={`mailto:${uploader_email}`}>
                      {uploader_email}
                    </a>
                  ) : (
                    'Email not available'
                  )}
                </p>

                <button
                  className="btn btn-outline-primary btn-sm w-100 mb-2"
                  onClick={() =>
                    uploader_email && window.open(`mailto:${uploader_email}`)
                  }
                  disabled={!uploader_email}
                >
                  Email
                </button>
                <button
                  className="btn btn-primary btn-sm w-100"
                  onClick={() =>
                    alert('Chat feature coming soon (demo button)')
                  }
                >
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*  OPTIONAL: skeleton shimmer CSS  — add once globally

*/
