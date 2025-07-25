import React, { useRef, useState } from "react";

const amenitiesList = [
  { label: "Smoke alarm", group: "Home safety" },
  { label: "Self check-in with lockbox", group: "Home safety" },
  { label: "Carbon monoxide alarm", group: "Home safety" },
  { label: "Security cameras", group: "Home safety" },
  { label: "Hangers", group: "Bedroom" },
  { label: "Extra pillows & blankets", group: "Bedroom" },
  { label: "Bed linens", group: "Bedroom" },
  { label: "TV with standard cable", group: "Bedroom" },
  { label: "Refrigerator", group: "Kitchen" },
  { label: "Dishwasher", group: "Kitchen" },
  { label: "Microwave", group: "Kitchen" },
  { label: "Coffee maker", group: "Kitchen" },
];

export default function UploadProperty() {
  const [media, setMedia] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    zip: "",
    country: "",
    province: "",
    neighborhood: "",
    location: "",
    price: "",
    unitPrice: "",
    beforeLabel: "",
    afterLabel: "",
    propertyType: "",
    propertyStatus: "",
    propertyLabel: "",
    size: "",
    landArea: "",
    propertyId: "",
    rooms: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    garageSize: "",
    yearBuilt: "",
    amenities: [],
    virtualTourType: "embed",
    virtualTourEmbed: "",
    virtualTourImage: null,
    videoUrl: "",
    floorEnabled: false,
    floorName: "",
    floorPrice: "",
    floorPostfix: "",
    floorSize: "",
    sizePostfix: "",
    floorBedrooms: "",
    floorBathrooms: "",
    floorImage: null,
    floorDescription: "",
    agentInfo: "user",
    otherContact: "",
  });

  const fileInputRef = useRef();
  const floorImgRef = useRef();
  const tourImgRef = useRef();

  // Media upload handlers
  const handleMediaChange = (e) => {
    let files = Array.from(e.target.files);
    if (media.length + files.length > 10) files = files.slice(0, 10 - media.length);
    setMedia([...media, ...files]);
  };
  const handleMediaDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    let files = Array.from(e.dataTransfer.files);
    if (media.length + files.length > 10) files = files.slice(0, 10 - media.length);
    setMedia([...media, ...files]);
  };
  const handleMediaRemove = (idx) => {
    setMedia(media.filter((_, i) => i !== idx));
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name === "amenities") {
      setForm((f) => ({
        ...f,
        amenities: checked
          ? [...f.amenities, value]
          : f.amenities.filter((a) => a !== value),
      }));
    } else if (type === "file") {
      setForm((f) => ({ ...f, [name]: files[0] }));
    } else if (type === "checkbox" && name === "floorEnabled") {
      setForm((f) => ({ ...f, floorEnabled: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Property submitted! (Demo only)");
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit}>
        {/* Upload Media */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Upload Media</h5>
            <div
              className={`border rounded-3 p-4 mb-3 text-center ${dragActive ? "bg-light" : ""}`}
              style={{ borderStyle: "dashed", cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleMediaDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleMediaChange}
              />
              <div className="mb-2">
                <i className="bi bi-cloud-arrow-up fs-2 text-primary"></i>
              </div>
              <div>
                <span className="fw-semibold">Select photos</span> or drag photos here
              </div>
              <div className="small text-muted">(Up to 10 photos)</div>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {media.map((img, idx) => (
                <div key={idx} className="position-relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="rounded border"
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    style={{ padding: "2px 5px", fontSize: 12 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMediaRemove(idx);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Title*</label>
                <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Choose</label>
                <input className="form-control" disabled value="-" />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" rows={2} value={form.description} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Full Address*</label>
                <input className="form-control" name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Zip Code*</label>
                <input className="form-control" name="zip" value={form.zip} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Country*</label>
                <input className="form-control" name="country" value={form.country} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Province/State*</label>
                <input className="form-control" name="province" value={form.province} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Neighborhood*</label>
                <input className="form-control" name="neighborhood" value={form.neighborhood} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Location*</label>
                <input className="form-control" name="location" value={form.location} onChange={handleChange} required />
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Price</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Price*</label>
                <input className="form-control" name="price" value={form.price} onChange={handleChange} required />
                <div className="form-text">Example value: 12345.67</div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Unit Price*</label>
                <input className="form-control" name="unitPrice" value={form.unitPrice} onChange={handleChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">Before Price Label*</label>
                <input className="form-control" name="beforeLabel" value={form.beforeLabel} onChange={handleChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">After Price Label*</label>
                <input className="form-control" name="afterLabel" value={form.afterLabel} onChange={handleChange} required />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Additional Information</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Property Type*</label>
                <input className="form-control" name="propertyType" value={form.propertyType} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Property Status*</label>
                <input className="form-control" name="propertyStatus" value={form.propertyStatus} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Property Label*</label>
                <input className="form-control" name="propertyLabel" value={form.propertyLabel} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Size (SqFt)*</label>
                <input className="form-control" name="size" value={form.size} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Land Area (SqFt)*</label>
                <input className="form-control" name="landArea" value={form.landArea} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Property ID*</label>
                <input className="form-control" name="propertyId" value={form.propertyId} onChange={handleChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">Rooms*</label>
                <input className="form-control" name="rooms" value={form.rooms} onChange={handleChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">Bedrooms*</label>
                <input className="form-control" name="bedrooms" value={form.bedrooms} onChange={handleChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">Bathrooms*</label>
                <input className="form-control" name="bathrooms" value={form.bathrooms} onChange={handleChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">Garages*</label>
                <input className="form-control" name="garages" value={form.garages} onChange={handleChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">Garage Size (SqFt)*</label>
                <input className="form-control" name="garageSize" value={form.garageSize} onChange={handleChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">Year Built*</label>
                <input className="form-control" name="yearBuilt" value={form.yearBuilt} onChange={handleChange} required />
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Amenities</h5>
            <div className="row">
              {["Home safety", "Bedroom", "Kitchen"].map((group) => (
                <div className="col-md-4 mb-2" key={group}>
                  <div className="fw-semibold mb-2">{group}</div>
                  {amenitiesList
                    .filter((a) => a.group === group)
                    .map((a) => (
                      <div className="form-check" key={a.label}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="amenities"
                          value={a.label}
                          checked={form.amenities.includes(a.label)}
                          onChange={handleChange}
                          id={a.label}
                        />
                        <label className="form-check-label" htmlFor={a.label}>
                          {a.label}
                        </label>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Virtual Tour */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Virtual Tour 360</h5>
            <div className="mb-3">
              <label className="form-label">Virtual Tour Type:</label>
              <select
                className="form-select"
                name="virtualTourType"
                value={form.virtualTourType}
                onChange={handleChange}
              >
                <option value="embed">Embedded code</option>
                <option value="image">Upload image</option>
              </select>
            </div>
            {form.virtualTourType === "embed" ? (
              <div className="mb-3">
                <label className="form-label">Embedded Code Virtual 360</label>
                <textarea
                  className="form-control"
                  name="virtualTourEmbed"
                  value={form.virtualTourEmbed}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
            ) : (
              <div className="mb-3">
                <label className="form-label">Upload image</label>
                <input
                  ref={tourImgRef}
                  type="file"
                  name="virtualTourImage"
                  className="form-control"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Videos */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Videos</h5>
            <label className="form-label">Video URL:</label>
            <input
              className="form-control"
              name="videoUrl"
              value={form.videoUrl}
              onChange={handleChange}
              placeholder="Youtube, Vimeo url"
            />
          </div>
        </div>

        {/* Floors */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Floors</h5>
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="floorEnabled"
                checked={form.floorEnabled}
                onChange={handleChange}
                id="floorEnabled"
              />
              <label className="form-check-label" htmlFor="floorEnabled">
                Enable Floor Plan
              </label>
            </div>
            {form.floorEnabled && (
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Floor Name:</label>
                  <input className="form-control" name="floorName" value={form.floorName} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Floor Price (Only Digits):</label>
                  <input className="form-control" name="floorPrice" value={form.floorPrice} onChange={handleChange} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Price Postfix:</label>
                  <input className="form-control" name="floorPostfix" value={form.floorPostfix} onChange={handleChange} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Floor Size (Only Digits):</label>
                  <input className="form-control" name="floorSize" value={form.floorSize} onChange={handleChange} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Size Postfix:</label>
                  <input className="form-control" name="sizePostfix" value={form.sizePostfix} onChange={handleChange} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Bedrooms:</label>
                  <input className="form-control" name="floorBedrooms" value={form.floorBedrooms} onChange={handleChange} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Bathrooms:</label>
                  <input className="form-control" name="floorBathrooms" value={form.floorBathrooms} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Floor Image:</label>
                  <input
                    ref={floorImgRef}
                    type="file"
                    name="floorImage"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Description:</label>
                  <textarea className="form-control" name="floorDescription" value={form.floorDescription} onChange={handleChange} rows={2} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Agent Information */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Agent Information</h5>
            <div className="mb-3">
              <label className="form-label">Choose type agent information?</label>
              <select
                className="form-select"
                name="agentInfo"
                value={form.agentInfo}
                onChange={handleChange}
              >
                <option value="user">Your current user information</option>
                <option value="other">Other contact</option>
              </select>
            </div>
            {form.agentInfo === "other" && (
              <div className="mb-3">
                <input
                  className="form-control"
                  name="otherContact"
                  value={form.otherContact}
                  onChange={handleChange}
                  placeholder="Enter other contact info"
                />
              </div>
            )}
          </div>
        </div>

        {/* Save & Preview */}
        <div className="text-end">
          <button className="btn btn-primary px-4" type="submit">
            Add Property & Preview
          </button>
        </div>
      </form>
    </div>
  );
}
