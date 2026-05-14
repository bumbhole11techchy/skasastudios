'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─── design tokens ───────────────────────────────────── */
const C = {
  sageHint:   '#BFCFBB',
  mint:       '#C8D8C4',
  sage:       '#8EA58C',
  moss:       '#738A6E',
  evergreen:  '#344C3D',
  bg:         '#f4f7f3',
  bgCard:     'rgba(255,255,255,0.68)',
  textDark:   '#1e3028',
  textMid:    '#4a6552',
  textLight:  '#7a9a82',
};

/* ─── reusable inline styles ──────────────────────────── */
const S = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    background: `linear-gradient(160deg, #f4f7f3 0%, #edf2eb 40%, #e8efe6 100%)`,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  } as React.CSSProperties,

  inner: {
    maxWidth: '820px',
    margin: '0 auto',
    padding: '4rem 2rem 5rem',
  } as React.CSSProperties,

  badgeRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap' as const,
    marginBottom: '2rem',
  } as React.CSSProperties,

  badge: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 400,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: C.moss,
    border: `1px solid rgba(115,138,110,0.4)`,
    padding: '5px 14px',
    borderRadius: '2px',
    background: 'rgba(191,207,187,0.2)',
  } as React.CSSProperties,

  h1: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.8rem, 5vw, 4rem)',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: C.evergreen,
    lineHeight: 1.1,
    margin: '0 0 0.5rem',
  } as React.CSSProperties,

  h1em: {
    fontStyle: 'italic',
    color: C.sage,
  } as React.CSSProperties,

  dividerWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '2rem 0 1.5rem',
  } as React.CSSProperties,

  dividerLine: {
    flex: 1,
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${C.sage}, transparent)`,
  } as React.CSSProperties,

  diamond: {
    width: '6px',
    height: '6px',
    background: C.moss,
    transform: 'rotate(45deg)',
    flexShrink: 0,
  } as React.CSSProperties,

  quote: {
    borderLeft: `3px solid ${C.sage}`,
    padding: '1.1rem 1.8rem',
    background: 'rgba(191,207,187,0.15)',
    borderRadius: '0 8px 8px 0',
    margin: '1.5rem 0 1.8rem',
  } as React.CSSProperties,

  quoteText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.2rem',
    fontStyle: 'italic',
    fontWeight: 300,
    color: C.evergreen,
    lineHeight: 1.75,
    letterSpacing: '0.03em',
    margin: 0,
  } as React.CSSProperties,

  bodyText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '1rem',
    fontWeight: 300,
    color: C.textMid,
    lineHeight: 1.95,
    letterSpacing: '0.02em',
    margin: 0,
  } as React.CSSProperties,

  card: {
    position: 'relative' as const,
    padding: '1.8rem 2.2rem',
    borderLeft: `2px solid rgba(142,165,140,0.45)`,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(237,242,235,0.6) 100%)',
    borderRadius: '0 10px 10px 0',
    boxShadow: `3px 3px 24px rgba(52,76,61,0.06), inset 0 0 0 1px rgba(142,165,140,0.1)`,
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  iconCircle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    background: 'rgba(191,207,187,0.38)',
    borderRadius: '50%',
    marginBottom: '0.85rem',
    color: C.evergreen,
  } as React.CSSProperties,

  cardH2: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: C.evergreen,
    marginBottom: '0.9rem',
  } as React.CSSProperties,

  ornament: {
    textAlign: 'center' as const,
    color: C.sage,
    fontSize: '1.1rem',
    letterSpacing: '0.4em',
    opacity: 0.75,
    margin: '3.5rem 0 0.5rem',
    fontFamily: 'serif',
  } as React.CSSProperties,
};

/* ─── sub-components ──────────────────────────────────── */
function Divider() {
  return (
    <div style={S.dividerWrap}>
      <div style={S.dividerLine} />
      <div style={S.diamond} />
      <div style={S.dividerLine} />
    </div>
  );
}

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}
function SectionCard({ icon, title, children }: SectionCardProps) {
  return (
    <>
      <Divider />
      <div style={S.card}>
        <div style={S.iconCircle} aria-hidden="true">{icon}</div>
        <h2 style={S.cardH2}>{title}</h2>
        <p style={S.bodyText}>{children}</p>
      </div>
    </>
  );
}

/* ─── icons ───────────────────────────────────────────── */
const IconLeaf = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.8 0 3.5-.5 5-1.3" />
    <path d="M12 2c5.5 0 10 4.5 10 10 0 1.8-.5 3.5-1.3 5" />
    <path d="M12 12 2.5 21.5" />
  </svg>
);
const IconGem = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <polyline points="6 3 2 9 12 22 22 9 18 3" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <line x1="12" y1="3" x2="6" y2="9" />
    <line x1="12" y1="3" x2="18" y2="9" />
  </svg>
);
const IconStar = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconHeart = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

/* ─── page ────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      {/* Font loading via link — avoids hydration mismatch from @import in <style> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div style={S.page}>
        <Header />

        <main style={{ flex: 1 }}>
          <div style={S.inner}>

            {/* Badges */}
            <div style={S.badgeRow}>
              {['Est. in Elegance', 'Handcrafted', 'Premium Materials'].map(b => (
                <span key={b} style={S.badge}>{b}</span>
              ))}
            </div>

            {/* H1 */}
            <h1 style={S.h1}>
              About <em style={S.h1em}>Skasastudios</em>
            </h1>

            {/* Top divider */}
            <Divider />

            {/* Intro quote */}
            <blockquote style={S.quote}>
              <p style={S.quoteText}>
                &ldquo;Welcome to Skasastudios &mdash; your premier destination for exquisite jewellery
                that celebrates elegance, craftsmanship, and timeless beauty.&rdquo;
              </p>
            </blockquote>

            {/* Intro body */}
            <p style={S.bodyText}>
              With years of experience in the jewellery industry, we pride ourselves on delivering
              exceptional pieces that capture life&rsquo;s most precious moments &mdash; from everyday
              adornments to treasures passed down through generations.
            </p>

            {/* Section cards */}
            <SectionCard icon={IconLeaf} title="Our Mission">
              To create stunning, high-quality jewellery that brings joy and confidence to our customers.
              Every piece is crafted with meticulous attention to detail and a passion for perfection &mdash;
              because we believe beauty should feel intentional, never accidental.
            </SectionCard>

            <SectionCard icon={IconGem} title="Our Collections">
              From delicate engagement rings to statement necklaces, our diverse collections offer
              something for every occasion. Whether you&rsquo;re looking for classic elegance or
              contemporary designs, Skasastudios has the perfect piece waiting for you.
            </SectionCard>

            <SectionCard icon={IconStar} title="Quality & Craftsmanship">
              Each piece in our collection is carefully handpicked and crafted by master artisans
              dedicated to the highest quality. We use only premium materials and blend traditional
              goldsmithing techniques with modern innovation for pieces that truly endure.
            </SectionCard>

            <SectionCard icon={IconHeart} title="Customer Service">
              Your satisfaction is our priority. We offer excellent customer service, secure shipping,
              and a hassle-free return policy. Every interaction with Skasastudios should feel as
              precious as the pieces themselves &mdash; if you have any questions, our team is always here.
            </SectionCard>

            {/* Closing ornament */}
            <div style={S.ornament}>&#10022; &nbsp; &#10022; &nbsp; &#10022;</div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}