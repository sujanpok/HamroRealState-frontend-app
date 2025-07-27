import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_ROOM_MICROSRVICES_URL;
const DUMMY_IMAGE = "https://placeholdit.com/600x400/8ebbda/9e9cd8?text=loading...&font=cairo";

// Recognize videos by file extension (simple version)
function isVideo(fileUrl) {
  return /\.(mp4|webm|ogg)$/i.test(fileUrl);
}

// Recognize images
function isImage(fileUrl) {
  return /\.(jpe?g|png|webp|gif)$/i.test(fileUrl);
}

// Handle direct Google Drive for media, as before
function toDirectDriveUrl(url) {
  if (!url) return "";
  const match = url.match(/\/file\/d\/([^/]+)\//);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
}

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [idx, setIdx] = useState(0); // Carousel index
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/properties/${id}`)
      .then(res => { if (!res.ok) throw new Error('Property Not Found'); return res.json(); })
      .then(setProperty)
      .catch(err => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (<div className="container py-5 text-center"><span className="spinner-border" /></div>);
  if (fetchError || !property) return (
    <div className="container py-5 text-center">
      <h2 className="mb-3 text-danger">{fetchError || "Property Not Found"}</h2>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
    </div>
  );

  // Process media for carousel
  const mediaList = Array.isArray(property.image_objs) && property.image_objs.length
    ? property.image_objs.map(obj => ({
        url: toDirectDriveUrl(obj.file_url),
        isVideo: isVideo(obj.file_url),
        isImage: isImage(obj.file_url),
      }))
    : [{url: DUMMY_IMAGE, isImage: true, isVideo: false}];

  const mainMedia = mediaList[idx];
  const uploaderProfileImg = property.uploader_profile_image || "https://randomuser.me/api/portraits/men/32.jpg";
  const uploaderName = property.uploader_name || "Unknown";
  const uploaderEmail = property.uploader_email || "";
  const uploaderType = property.uploader_type || "";

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* GALLERY CAROUSEL */}
        <div className="row g-4 mb-4 align-items-center">
          <div className="col-lg-7">
            {/* Carousel main item */}
            <div style={{ position: 'relative', maxWidth: 600, margin: "auto" }}>
              {/* Left arrow */}
              {mediaList.length > 1 && (
                <button
                  style={{ position: 'absolute', left: 0, top: '40%', zIndex: 2 }}
                  className="btn btn-outline-secondary"
                  onClick={() => setIdx(idx === 0 ? mediaList.length - 1 : idx - 1)}
                >&lt;</button>
              )}
              <div className="bg-dark rounded shadow-sm d-flex align-items-center justify-content-center" style={{ height: 400 }}>
                {mainMedia.isVideo ? (
                  <video controls width="100%" style={{ maxHeight: 390, objectFit: 'contain' }}>
                    <source src={mainMedia.url} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={mainMedia.url}
                    alt={`Property media ${idx+1}`}
                    className="img-fluid"
                    style={{ height: 390, objectFit: 'contain', width: 'auto', maxWidth: '100%' }}
                  />
                )}
              </div>
              {/* Right arrow */}
              {mediaList.length > 1 && (
                <button
                  style={{ position: 'absolute', right: 0, top: '40%', zIndex: 2 }}
                  className="btn btn-outline-secondary"
                  onClick={() => setIdx((idx + 1) % mediaList.length)}
                >&gt;</button>
              )}
            </div>
            {/* Thumbnails for preview below carousel */}
            <div className="d-flex mt-2 justify-content-center">
              {mediaList.map((m, i) => (
                <div
                  key={i}
                  className={`mx-1 border ${i === idx ? 'border-primary' : 'border-light'}`}
                  onClick={() => setIdx(i)}
                  style={{ width: 64, height: 48, cursor: "pointer", overflow: "hidden", borderRadius: 6 }}>
                  {m.isVideo ? (
                    <video src={m.url} width="100%" height="100%" style={{ objectFit: 'cover' }} />
                  ) : (
                    <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Info */}
          <div className="col-lg-5">
            <h1 className="fw-bold mb-2">{property.TITLE}</h1>
            <h3 className="text-primary mb-2">{property.PRICE && Number(property.PRICE) > 0 ? `$${Number(property.PRICE).toLocaleString()}` : "Price on request"}</h3>
            <p className="mb-2 text-muted">
              <i className="bi bi-geo-alt me-2"></i>
              {property.LOCATION}, {property.CITY}
            </p>
            <p className="mb-2"><b>Type:</b> {property.PROPERTY_TYPE}</p>
            <button className="btn btn-primary me-2">Book a Visit</button>
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back to Listings</button>
          </div>
        </div>

        {/* Description & Uploader/Agent */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Property Description</h4>
                <p className="mb-0">{property.DESCRIPTION || "No property description available."}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <img
                  src={uploaderProfileImg}
                  alt={uploaderName}
                  className="rounded-circle mb-3"
                  style={{ width: 80, height: 80, objectFit: 'cover' }}
                />
                <h5 className="fw-bold mb-1">{uploaderName}</h5>
                <div className="mb-2 text-muted">{uploaderType}</div>
                <p>
                  <i className="bi bi-envelope me-1"></i>
                  {uploaderEmail
                    ? (<a href={`mailto:${uploaderEmail}`}>{uploaderEmail}</a>)
                    : "Email not provided"}
                </p>
                <button
                  className="btn btn-outline-primary btn-sm w-100 mb-2"
                  onClick={() => window.open(`mailto:${uploaderEmail}`)}
                  disabled={!uploaderEmail}
                >Email</button>
                {/* Example Chat Button – adapt trigger as needed */}
                <button
                  className="btn btn-primary btn-sm w-100"
                  onClick={() => alert("Chat feature not yet implemented!")}
                  // TODO: Link to chat or open chat modal
                >Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
