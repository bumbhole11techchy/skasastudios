'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const warmStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .contact-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(150deg, #fdf8f0 0%, #fef5e4 50%, #fdf0dc 100%);
    font-family: 'Jost', sans-serif;
    position: relative;
  }

  .contact-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .contact-inner {
    flex: 1;
    max-width: 960px;
    margin: 0 auto;
    width: 100%;
    padding: 3rem 1.5rem;
    position: relative;
    z-index: 1;
  }

  .serif-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #2c1a0e;
    font-weight: 400;
    letter-spacing: 0.04em;
  }

  .ornament-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 28px;
  }
  .ornament-divider::before,
  .ornament-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9a84c55, transparent);
  }
  .ornament-dot {
    width: 5px;
    height: 5px;
    background: #c9a84c;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .tag-pill {
    display: inline-flex;
    align-items: center;
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #a0722a;
    border: 1px solid #d4a84b55;
    padding: 3px 12px;
    border-radius: 2px;
    background: #fff9f0;
    margin-bottom: 12px;
  }

  /* Info card */
  .info-card {
    background: linear-gradient(145deg, #fffdf8 0%, #fdf8ee 100%);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    padding: 32px 28px;
    box-shadow: 0 2px 12px #c9a84c0a, 0 8px 28px #c9a84c08;
    position: relative;
    height: fit-content;
  }
  .info-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, #c9a84c88, transparent);
    border-radius: 4px 0 0 4px;
  }

  .info-block {
    padding: 16px 0;
    border-bottom: 1px solid #e8d5a844;
  }
  .info-block:first-of-type { padding-top: 0; }
  .info-block:last-of-type { border-bottom: none; padding-bottom: 0; }

  .info-block-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 6px;
  }

  .info-block-text {
    font-family: 'Jost', sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    color: #5c3d1e;
    line-height: 1.7;
    letter-spacing: 0.02em;
  }

  /* Form card */
  .form-card {
    background: linear-gradient(145deg, #fffdf8 0%, #fdf8ee 100%);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    padding: 32px 28px;
    box-shadow: 0 2px 12px #c9a84c0a, 0 8px 32px #c9a84c0c;
    position: relative;
  }
  .form-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 4px;
    background: linear-gradient(135deg, #d4a84b22, transparent 40%, transparent 60%, #d4a84b18);
    pointer-events: none;
    z-index: -1;
  }

  .gold-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8a6020;
    display: block;
    margin-bottom: 6px;
  }

  .warm-input {
    width: 100%;
    background: #fffcf5;
    border: 1px solid #ddc87a66;
    border-radius: 2px;
    padding: 10px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: #3a2410;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .warm-input:focus {
    border-color: #c9a84c;
    box-shadow: 0 0 0 3px #c9a84c18;
    background: #fffef9;
  }
  .warm-input::placeholder { color: #c4a882; }

  .warm-textarea {
    resize: none;
    height: 120px;
  }

  .gold-btn {
    width: 100%;
    background: linear-gradient(135deg, #c9a84c 0%, #a8832a 100%);
    color: #fff8ec;
    border: none;
    border-radius: 2px;
    padding: 14px 20px;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 16px #c9a84c44;
  }
  .gold-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px #c9a84c55;
  }
  .gold-btn.submitted {
    background: linear-gradient(135deg, #7a9a5a, #5a7a3a);
    box-shadow: 0 4px 16px #7a9a5a33;
  }
`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <style>{warmStyles}</style>
      <div className="contact-wrap">
        <Header />

        <div className="contact-inner">

          {/* Page heading */}
          <div style={{ marginBottom: '8px' }}>
            <span className="tag-pill">✦ We'd Love to Hear From You</span>
            <h1 className="serif-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Contact Us
            </h1>
          </div>
          <div className="ornament-divider"><div className="ornament-dot" /></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>

            {/* Contact Information */}
            <div className="info-card">
              <span className="tag-pill">✦ Get in Touch</span>
              <h2 className="serif-title" style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
                Reach Us
              </h2>
              <div className="ornament-divider" style={{ margin: '10px 0 20px' }}>
                <div className="ornament-dot" />
              </div>

              <div className="info-block">
                <p className="info-block-label">Email</p>
                <p className="info-block-text">
                  info@skasastudios.com<br />
                  support@skasastudios.com
                </p>
              </div>

              <div className="info-block">
                <p className="info-block-label">Phone</p>
                <p className="info-block-text">
                  +1 (555) 123-4567<br />
                  Monday – Friday: 10AM – 6PM
                </p>
              </div>

              <div className="info-block">
                <p className="info-block-label">Address</p>
                <p className="info-block-text">
                  Skasastudios Jewelry Store<br />
                  123 Jewelry Lane<br />
                  City, State 12345<br />
                  Country
                </p>
              </div>

              <div className="info-block">
                <p className="info-block-label">Business Hours</p>
                <p className="info-block-text">
                  Monday – Friday: 10:00 AM – 6:00 PM<br />
                  Saturday: 11:00 AM – 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="form-card">
              <span className="tag-pill">✦ Send a Message</span>
              <h2 className="serif-title" style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
                Write to Us
              </h2>
              <div className="ornament-divider" style={{ margin: '10px 0 24px' }}>
                <div className="ornament-dot" />
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                  <div>
                    <label className="gold-label">Your Name</label>
                    <input type="text" name="name" placeholder="Aanya Sharma" value={formData.name} onChange={handleChange} required className="warm-input" />
                  </div>
                  <div>
                    <label className="gold-label">Email</label>
                    <input type="email" name="email" placeholder="aanya@example.com" value={formData.email} onChange={handleChange} required className="warm-input" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                  <div>
                    <label className="gold-label">Phone <span style={{ opacity: 0.5, fontWeight: 300, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                    <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} className="warm-input" />
                  </div>
                  <div>
                    <label className="gold-label">Subject</label>
                    <input type="text" name="subject" placeholder="Enquiry about a piece" value={formData.subject} onChange={handleChange} required className="warm-input" />
                  </div>
                </div>

                <div>
                  <label className="gold-label">Message</label>
                  <textarea name="message" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} required className="warm-input warm-textarea" />
                </div>

                <div className="ornament-divider" style={{ margin: '0' }}>
                  <div className="ornament-dot" />
                </div>

                <button type="submit" className={`gold-btn${submitted ? ' submitted' : ''}`}>
                  {submitted ? '✦  Message Sent Successfully' : '✦  Send Message'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#b09060', letterSpacing: '0.06em', fontWeight: 300 }}>
                  We typically respond within 24 hours
                </p>
              </form>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}