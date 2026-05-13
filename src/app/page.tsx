'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const warmStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .home-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(150deg, #fdf8f0 0%, #fef5e4 50%, #fdf0dc 100%);
    font-family: 'Jost', sans-serif;
    position: relative;
  }

  /* Subtle noise grain over entire page */
  .home-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* ── Hero ── */
  .hero {
    position: relative;
    width: 100%;
    padding: 5.5rem 1.5rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(160deg, #1e1008 0%, #3a2008 45%, #2c1a0e 100%);
    overflow: hidden;
    z-index: 1;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)' opacity='0.07'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .hero-glow {
    position: absolute;
    width: 560px;
    height: 260px;
    background: radial-gradient(ellipse, #c9a84c1a 0%, transparent 68%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .hero::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 72px;
    background: linear-gradient(to bottom, transparent, #fdf8f0);
    z-index: 2;
  }

  .hero-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 20px;
    position: relative;
    z-index: 3;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.6rem, 8vw, 5.5rem);
    font-weight: 300;
    color: #fdf8f0;
    letter-spacing: 0.14em;
    line-height: 1.05;
    position: relative;
    z-index: 3;
  }

  .hero-title em {
    color: #c9a84c;
    font-style: italic;
  }

  .hero-ornament {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    position: relative;
    z-index: 3;
  }
  .hero-line {
    width: 56px; height: 1px;
    background: linear-gradient(90deg, transparent, #c9a84c77);
  }
  .hero-line.r { background: linear-gradient(90deg, #c9a84c77, transparent); }
  .hero-diamond {
    width: 6px; height: 6px;
    background: #c9a84c;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .hero-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    font-weight: 300;
    color: #e8d5a899;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    position: relative;
    z-index: 3;
  }

  /* ── Trust bar ── */
  .trust-bar {
    width: 100%;
    background: linear-gradient(135deg, #2c1a0e, #3e2410);
    border-bottom: 1px solid #c9a84c22;
    padding: 14px 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: 'Jost', sans-serif;
    font-size: 0.67rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e8d5a8bb;
    font-weight: 300;
    white-space: nowrap;
  }
  .trust-icon { color: #c9a84c; }
  .trust-sep {
    width: 4px; height: 4px;
    background: #c9a84c44;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── Products section ── */
  .products-section {
    flex: 1;
    width: 100%;
    max-width: 1260px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 5rem;
    position: relative;
    z-index: 1;
  }

  .section-head { text-align: center; margin-bottom: 8px; }

  .tag-pill {
    display: inline-flex;
    align-items: center;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #a0722a;
    border: 1px solid #d4a84b55;
    padding: 3px 14px;
    border-radius: 2px;
    background: #fff9f0;
    margin-bottom: 12px;
  }

  .serif-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #2c1a0e;
    font-weight: 400;
    letter-spacing: 0.05em;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    margin-bottom: 6px;
  }

  .ornament-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px auto 36px;
    max-width: 200px;
  }
  .ornament-divider::before,
  .ornament-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9a84c55, transparent);
  }
  .ornament-dot {
    width: 5px; height: 5px;
    background: #c9a84c;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── Loading ── */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 0;
    gap: 16px;
  }

  .spinner {
    width: 30px; height: 30px;
    border: 2px solid #e8d5a8;
    border-top-color: #c9a84c;
    border-radius: 50%;
    animation: spin 0.85s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #a0722a;
    font-weight: 300;
  }

  /* ── Empty state ── */
  .empty-state {
    text-align: center;
    padding: 5rem 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: #8a6020;
    letter-spacing: 0.06em;
    font-style: italic;
  }

  /* ── Grid ── */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.75rem;
  }

  @media (max-width: 500px) {
    .trust-sep { display: none; }
    .products-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
  }
`;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: warmStyles }} />
      <div className="home-wrap">
        <Header />

        {/* Hero */}
        <section className="hero">
          <div className="hero-glow" />
          <p className="hero-eyebrow">✦ Artisan Jewellery · Est. 2020</p>
          <h1 className="hero-title">SKASA<em>Studios</em></h1>
          <div className="hero-ornament">
            <div className="hero-line" />
            <div className="hero-diamond" />
            <div className="hero-line r" />
          </div>
          <p className="hero-sub">Premium Jewellery for Every Moment</p>
        </section>

        {/* Trust bar */}
        <div className="trust-bar">
          <div className="trust-item"><span className="trust-icon">✦</span> Free shipping</div>
          <div className="trust-sep" />
          <div className="trust-item"><span className="trust-icon">✦</span> Gift wrap included</div>
          <div className="trust-sep" />
          <div className="trust-item"><span className="trust-icon">✦</span> Hallmarked &amp; certified</div>
          <div className="trust-sep" />
          <div className="trust-item"><span className="trust-icon">✦</span> 30-day returns</div>
        </div>

        {/* Products */}
        <section className="products-section">
          <div className="section-head">
            <div className="tag-pill">✦ Curated Collections</div>
            <h2 className="serif-title">Our Collections</h2>
          </div>
          <div className="ornament-divider"><div className="ornament-dot" /></div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <span className="loading-text">Curating your collection…</span>
            </div>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              No pieces available just yet — check back soon.
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}