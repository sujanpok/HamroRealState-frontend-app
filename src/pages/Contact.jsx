import React, { useState } from 'react';
import { useTheme } from '../App';

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center fade-in-up">
                <div className="success-message p-5">
                  <div className="success-icon mb-4">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h2 className="fw-bold mb-3 text-gradient">Message Sent Successfully!</h2>
                  <p className="lead text-muted mb-4">
                    Thank you for contacting Nepal Room Hub. We've received your message and will get back to you within 24 hours.
                  </p>
                  <button 
                    className="btn btn-primary btn-animated px-4"
                    onClick={() => setSubmitted(false)}
                  >
                    <i className="bi bi-arrow-left me-2"></i>Send Another Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="text-center mb-5 fade-in-up">
            <h1 className="display-4 fw-bold mb-3 text-gradient">Get in Touch</h1>
            <p className="lead text-muted">
              Have questions about room rentals in Nepal? We're here to help you find your perfect accommodation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-5 bg-light-subtle">
        <div className="container">
          <div className="row g-4 mb-5">
            {[
              {
                icon: 'bi-telephone',
                title: 'Call Us',
                info: '+977-1-4567890',
                subInfo: 'Mon-Fri, 9AM-6PM NPT',
                color: 'primary',
                link: 'tel:+97714567890'
              },
              {
                icon: 'bi-envelope',
                title: 'Email Us',
                info: 'info@nepalroomhub.com',
                subInfo: 'We reply within 2 hours',
                color: 'success',
                link: 'mailto:info@nepalroomhub.com'
              },
              {
                icon: 'bi-geo-alt',
                title: 'Visit Us',
                info: 'Thamel, Kathmandu',
                subInfo: 'Nepal Room Hub Office',
                color: 'warning',
                link: '#'
              },
              {
                icon: 'bi-chat-dots',
                title: 'Live Chat',
                info: 'Chat with Support',
                subInfo: 'Available 24/7',
                color: 'info',
                link: '#'
              }
            ].map((contact, index) => (
              <div key={index} className="col-lg-3 col-md-6 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="contact-info-card h-100 text-center hover-lift">
                  <div className={`contact-icon bg-${contact.color} bg-gradient mb-3`}>
                    <i className={`bi ${contact.icon}`}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{contact.title}</h5>
                  <p className="fw-semibold text-dark mb-1">{contact.info}</p>
                  <p className="text-muted small mb-3">{contact.subInfo}</p>
                  <a href={contact.link} className={`btn btn-outline-${contact.color} btn-sm btn-animated`}>
                    Contact Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left: Contact Image */}
            <div className="col-lg-6 mb-5 mb-lg-0 fade-in-right">
              <div className="contact-image-container position-relative">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&auto=format"
                  alt="Nepal Room Hub Office"
                  className="img-fluid rounded-4 shadow-lg floating-animation"
                />
                <div className="contact-overlay">
                  <div className="contact-feature glass-morphism p-3 rounded-3">
                    <i className="bi bi-shield-check text-primary fs-4"></i>
                    <div className="ms-3">
                      <h6 className="fw-bold mb-1 text-white">Trusted Service</h6>
                      <small className="text-white-50">1000+ Happy Customers</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="col-lg-6 fade-in-left">
              <div className="contact-form-container">
                <div className="contact-form-header mb-4">
                  <h2 className="fw-bold mb-3">Send Us a Message</h2>
                  <p className="text-muted">
                    Whether you're looking for a room, want to list your property, or need assistance, 
                    we're here to help. Fill out the form below and we'll get back to you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {error}
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setError(null)}
                        aria-label="Close"
                      ></button>
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          required
                        />
                        <label htmlFor="name">
                          <i className="bi bi-person me-2"></i>Your Name *
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email"
                          required
                        />
                        <label htmlFor="email">
                          <i className="bi bi-envelope me-2"></i>Your Email *
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                        />
                        <label htmlFor="phone">
                          <i className="bi bi-telephone me-2"></i>Phone Number
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="rent">Looking for Room</option>
                          <option value="list">List My Room</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                        </select>
                        <label htmlFor="inquiryType">
                          <i className="bi bi-question-circle me-2"></i>Inquiry Type
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject"
                          required
                        />
                        <label htmlFor="subject">
                          <i className="bi bi-chat-left-text me-2"></i>Subject *
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-4">
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your Message"
                          style={{ height: '120px' }}
                          required
                        ></textarea>
                        <label htmlFor="message">
                          <i className="bi bi-pencil-square me-2"></i>Your Message *
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg btn-animated"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>Send Message
                        </>
                      )}
                    </button>
                  </div>

                  <div className="form-footer mt-3 text-center">
                    <small className="text-muted">
                      <i className="bi bi-shield-lock me-1"></i>
                      Your information is secure and will never be shared with third parties.
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light-subtle">
        <div className="container">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="display-5 fw-bold mb-3">Frequently Asked Questions</h2>
            <p className="lead text-muted">Quick answers to common questions about Nepal Room Hub</p>
          </div>

          <div className="row g-4">
            {[
              {
                question: "How do I list my room on Nepal Room Hub?",
                answer: "Simply create an account and use our 'Add Property' feature. Our team will verify your listing within 24 hours."
              },
              {
                question: "Are all room listings verified?",
                answer: "Yes, every room listing is personally verified by our team to ensure authenticity and quality."
              },
              {
                question: "What cities do you cover?",
                answer: "We currently cover Kathmandu, Pokhara, Chitwan, Lalitpur, Bhaktapur, and 45+ other cities across Nepal."
              },
              {
                question: "How can I contact room owners?",
                answer: "Once you find a room you like, you can directly contact the owner through our secure messaging system."
              },
              {
                question: "Is there any commission or hidden fees?",
                answer: "No hidden fees! We believe in transparent pricing. Room owners and tenants can connect directly without any commission."
              },
              {
                question: "Do you provide rental agreements?",
                answer: "Yes, we provide template rental agreements and can assist with legal documentation if needed."
              }
            ].map((faq, index) => (
              <div key={index} className="col-lg-6 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="faq-card h-100 hover-lift">
                  <div className="faq-icon mb-3">
                    <i className="bi bi-question-circle text-primary"></i>
                  </div>
                  <h5 className="fw-bold mb-3">{faq.question}</h5>
                  <p className="text-muted mb-0">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5 fade-in-up">
            <p className="text-muted mb-3">Still have questions?</p>
            <a href="#contact-form" className="btn btn-outline-primary btn-animated">
              <i className="bi bi-chat-dots me-2"></i>Ask Us Anything
            </a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="display-5 fw-bold mb-3">Visit Our Office</h2>
            <p className="lead text-muted">Located in the heart of Kathmandu, Nepal</p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-8 fade-in-left">
              <div className="map-container rounded-4 overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5555!2d85.3100!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19362c7c7e5d%3A0x5e5d5e5d5e5d5e5d!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2s!4v1629876543210!5m2!1sen!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nepal Room Hub Office Location"
                ></iframe>
              </div>
            </div>
            
            <div className="col-lg-4 fade-in-right">
              <div className="office-info">
                <h4 className="fw-bold mb-4">Nepal Room Hub Office</h4>
                <div className="office-detail mb-3">
                  <i className="bi bi-geo-alt text-primary me-3 fs-5"></i>
                  <div>
                    <strong>Address:</strong><br />
                    Thamel Marg, Ward 26<br />
                    Kathmandu 44600, Nepal
                  </div>
                </div>
                <div className="office-detail mb-3">
                  <i className="bi bi-clock text-primary me-3 fs-5"></i>
                  <div>
                    <strong>Office Hours:</strong><br />
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </div>
                </div>
                <div className="office-detail mb-4">
                  <i className="bi bi-bus-front text-primary me-3 fs-5"></i>
                  <div>
                    <strong>How to Reach:</strong><br />
                    Take a taxi to Thamel or use local bus routes 1, 2, or 3 to Thamel Chowk.
                  </div>
                </div>
                <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-animated">
                  <i className="bi bi-map me-2"></i>Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
