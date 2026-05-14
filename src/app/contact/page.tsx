'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─── tokens ──────────────────────────────────────────── */
const C = {
  sageHint:  '#BFCFBB',
  sage:      '#8EA58C',
  moss:      '#738A6E',
  evergreen: '#344C3D',
  bg:        'linear-gradient(150deg, #f4f7f3 0%, #edf2eb 50%, #e6ede4 100%)',
  bgCard:    'linear-gradient(145deg, rgba(255,255,255,0.78) 0%, rgba(237,242,235,0.65) 100%)',
  textDark:  '#1e3028',
  textMid:   '#4a6552',
  textLight: '#7a9a82',
  border:    'rgba(142,165,140,0.4)',
  borderSoft:'rgba(142,165,140,0.22)',
};

/* ─── styles ──────────────────────────────────────────── */
const S = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    background: C.bg,
    fontFamily: "'Jost', sans-serif",
  } as React.CSSProperties,

  inner: {
    flex: 1,
    maxWidth: '960px',
    margin: '0 auto',
    width: '100%',
    padding: '3rem 1.5rem',
  } as React.CSSProperties,

  tagPill: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: C.moss,
    border: `1px solid rgba(115,138,110,0.38)`,
    padding: '3px 12px',
    borderRadius: '2px',
    background: 'rgba(191,207,187,0.2)',
    marginBottom: '12px',
  } as React.CSSProperties,

  h1: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 400,
    letterSpacing: '0.04em',
    color: C.evergreen,
    lineHeight: 1.15,
    margin: 0,
  } as React.CSSProperties,

  h2: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.5rem',
    fontWeight: 400,
    letterSpacing: '0.04em',
    color: C.evergreen,
    marginBottom: '6px',
  } as React.CSSProperties,

  dividerWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 0 28px',
  } as React.CSSProperties,

  dividerLine: {
    flex: 1,
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${C.sage}, transparent)`,
    opacity: 0.5,
  } as React.CSSProperties,

  diamond: {
    width: '5px',
    height: '5px',
    background: C.moss,
    transform: 'rotate(45deg)',
    flexShrink: 0,
  } as React.CSSProperties,

  /* Info card */
  infoCard: {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: '4px',
    padding: '32px 28px',
    boxShadow: `0 2px 12px rgba(52,76,61,0.05), 0 8px 28px rgba(52,76,61,0.04)`,
    position: 'relative' as const,
    height: 'fit-content' as const,
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  infoCardBar: {
    position: 'absolute' as const,
    left: 0, top: 0, bottom: 0,
    width: '2px',
    background: `linear-gradient(180deg, transparent, ${C.sage}, transparent)`,
    borderRadius: '4px 0 0 4px',
    opacity: 0.7,
  } as React.CSSProperties,

  infoBlock: {
    padding: '16px 0',
    borderBottom: `1px solid rgba(142,165,140,0.2)`,
  } as React.CSSProperties,

  infoBlockFirst: {
    padding: '0 0 16px',
    borderBottom: `1px solid rgba(142,165,140,0.2)`,
  } as React.CSSProperties,

  infoBlockLast: {
    padding: '16px 0 0',
    borderBottom: 'none',
  } as React.CSSProperties,

  infoLabel: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.66rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: C.moss,
    marginBottom: '6px',
  } as React.CSSProperties,

  infoText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 300,
    color: C.textMid,
    lineHeight: 1.7,
    letterSpacing: '0.02em',
    margin: 0,
  } as React.CSSProperties,

  /* Form card */
  formCard: {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: '4px',
    padding: '32px 28px',
    boxShadow: `0 2px 12px rgba(52,76,61,0.05), 0 8px 32px rgba(52,76,61,0.06)`,
    position: 'relative' as const,
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  fieldLabel: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: C.moss,
    display: 'block',
    marginBottom: '6px',
  } as React.CSSProperties,

  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.85)',
    border: `1px solid rgba(115,138,110,0.35)`,
    borderRadius: '2px',
    padding: '10px 14px',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 300,
    color: C.textDark,
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
  } as React.CSSProperties,

  textarea: {
    width: '100%',
    background: 'rgba(255,255,255,0.85)',
    border: `1px solid rgba(115,138,110,0.35)`,
    borderRadius: '2px',
    padding: '10px 14px',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 300,
    color: C.textDark,
    outline: 'none',
    boxSizing: 'border-box' as const,
    resize: 'none' as const,
    height: '120px',
    transition: 'border-color 0.2s',
  } as React.CSSProperties,

  submitBtn: {
    width: '100%',
    background: C.evergreen,
    color: C.sageHint,
    border: 'none',
    borderRadius: '2px',
    padding: '14px 20px',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.74rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.15s',
  } as React.CSSProperties,

  submitBtnSuccess: {
    background: C.moss,
  } as React.CSSProperties,

  responseNote: {
    textAlign: 'center' as const,
    fontSize: '0.7rem',
    color: C.textLight,
    letterSpacing: '0.06em',
    fontWeight: 300,
    margin: 0,
  } as React.CSSProperties,
};

/* ─── helpers ─────────────────────────────────────────── */
function Divider({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ ...S.dividerWrap, ...style }}>
      <div style={S.dividerLine} />
      <div style={S.diamond} />
      <div style={S.dividerLine} />
    </div>
  );
}

function InputField({
  label, name, type = 'text', placeholder, value, onChange, required = false,
  optional = false,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; optional?: boolean;
}) {
  return (
    <div>
      <label style={S.fieldLabel}>
        {label}{optional && (
          <span style={{ opacity: 0.5, fontWeight: 300, textTransform: 'none', letterSpacing: 0, marginLeft: '4px' }}>(optional)</span>
        )}
      </label>
      <input
        type={type} name={name} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        style={S.input}
        onFocus={e => { e.target.style.borderColor = C.moss; e.target.style.boxShadow = `0 0 0 3px rgba(115,138,110,0.12)`; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(115,138,110,0.35)'; e.target.style.boxShadow = 'none'; }}
      />
    </div>
  );
}

/* ─── page ────────────────────────────────────────────── */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div style={S.page}>
        <Header />

        <div style={S.inner}>

          {/* Page heading */}
          <div style={{ marginBottom: '8px' }}>
            <span style={S.tagPill}>✦ We&rsquo;d Love to Hear From You</span>
            <h1 style={S.h1}>Contact Us</h1>
          </div>
          <Divider />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>

            {/* ── Contact info ── */}
            <div style={S.infoCard}>
              <div style={S.infoCardBar} />
              <span style={S.tagPill}>✦ Get in Touch</span>
              <h2 style={S.h2}>Reach Us</h2>
              <Divider style={{ margin: '10px 0 20px' }} />

              <div style={S.infoBlockFirst}>
                <p style={S.infoLabel}>Email</p>
                <p style={S.infoText}>
                  info@skasastudios.com<br />
                  support@skasastudios.com
                </p>
              </div>

              <div style={S.infoBlock}>
                <p style={S.infoLabel}>Phone</p>
                <p style={S.infoText}>
                  +1 (555) 123-4567<br />
                  Monday &ndash; Friday: 10AM &ndash; 6PM
                </p>
              </div>

              <div style={S.infoBlock}>
                <p style={S.infoLabel}>Address</p>
                <p style={S.infoText}>
                  Skasastudios Jewelry Store<br />
                  123 Jewelry Lane<br />
                  City, State 12345<br />
                  Country
                </p>
              </div>

              <div style={S.infoBlockLast}>
                <p style={S.infoLabel}>Business Hours</p>
                <p style={S.infoText}>
                  Monday &ndash; Friday: 10:00 AM &ndash; 6:00 PM<br />
                  Saturday: 11:00 AM &ndash; 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* ── Contact form ── */}
            <div style={S.formCard}>
              <span style={S.tagPill}>✦ Send a Message</span>
              <h2 style={S.h2}>Write to Us</h2>
              <Divider style={{ margin: '10px 0 24px' }} />

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                  <InputField label="Your Name" name="name" placeholder="Aanya Sharma"       value={formData.name}    onChange={handleChange} required />
                  <InputField label="Email"     name="email" type="email" placeholder="aanya@example.com" value={formData.email} onChange={handleChange} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                  <InputField label="Phone"   name="phone"   type="tel" placeholder="+91 98765 43210"      value={formData.phone}   onChange={handleChange} optional />
                  <InputField label="Subject" name="subject" placeholder="Enquiry about a piece" value={formData.subject} onChange={handleChange} required />
                </div>

                <div>
                  <label style={S.fieldLabel}>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={S.textarea}
                    onFocus={e => { e.currentTarget.style.borderColor = C.moss; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(115,138,110,0.12)`; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(115,138,110,0.35)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                <Divider style={{ margin: '0' }} />

                <button
                  type="submit"
                  style={{ ...S.submitBtn, ...(submitted ? S.submitBtnSuccess : {}) }}
                >
                  {submitted ? '✦  Message Sent Successfully' : '✦  Send Message'}
                </button>

                <p style={S.responseNote}>We typically respond within 24 hours</p>

              </form>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}