'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const warmStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .success-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(150deg, #fdf8f0 0%, #fef5e4 50%, #fdf0dc 100%);
    font-family: 'Jost', sans-serif;
    position: relative;
  }

  .success-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .success-inner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    position: relative;
    z-index: 1;
  }

  .success-card {
    background: linear-gradient(145deg, #fffdf8 0%, #fdf8ee 100%);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    padding: 52px 48px;
    max-width: 560px;
    width: 100%;
    text-align: center;
    box-shadow:
      0 2px 4px #c9a84c0a,
      0 8px 32px #c9a84c12,
      0 32px 64px #c9a84c08,
      inset 0 1px 0 #fff8ec;
    position: relative;
  }

  .success-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 4px;
    background: linear-gradient(135deg, #d4a84b33, transparent 40%, transparent 60%, #d4a84b22);
    pointer-events: none;
    z-index: -1;
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
    margin: 16px auto;
    max-width: 280px;
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
    margin-bottom: 20px;
  }

  /* Gold checkmark medallion */
  .check-medallion {
    width: 80px;
    height: 80px;
    margin: 0 auto 28px;
    position: relative;
  }
  .check-medallion-ring {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fef3d4, #fdf0c0);
    border: 2px solid #c9a84c66;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px #c9a84c22, inset 0 1px 0 #fff8ec;
    position: relative;
  }
  .check-medallion-ring::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    border: 1px solid #c9a84c33;
  }
  .check-icon {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2rem;
    color: #a0722a;
    line-height: 1;
  }

  /* Order ID block */
  .order-id-block {
    background: #fffcf5;
    border: 1px solid #e8d5a8;
    border-radius: 2px;
    padding: 12px 20px;
    margin: 20px 0;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 220px;
  }
  .order-id-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a84c;
    font-weight: 600;
  }
  .order-id-value {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.15rem;
    font-weight: 500;
    color: #2c1a0e;
    letter-spacing: 0.06em;
  }

  /* Info box */
  .info-box {
    background: linear-gradient(90deg, #fdf6e3, #fef9ed);
    border: 1px solid #e8d5a888;
    border-radius: 2px;
    padding: 18px 20px;
    margin: 24px 0;
    text-align: left;
    position: relative;
  }
  .info-box::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, #c9a84c88, transparent);
    border-radius: 2px 0 0 2px;
  }
  .info-box p {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: #5c3d1e;
    line-height: 1.7;
    letter-spacing: 0.02em;
    margin: 0 0 8px;
  }
  .info-box p:last-child { margin: 0; }

  /* Buttons */
  .gold-btn {
    display: inline-block;
    background: linear-gradient(135deg, #c9a84c 0%, #a8832a 100%);
    color: #fff8ec;
    border: none;
    border-radius: 2px;
    padding: 13px 28px;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 16px #c9a84c44;
  }
  .gold-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px #c9a84c55;
  }

  .ghost-btn {
    display: inline-block;
    background: transparent;
    border: 1px solid #c9a84c88;
    color: #8a6020;
    border-radius: 2px;
    padding: 12px 28px;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .ghost-btn:hover {
    background: #c9a84c11;
    color: #6b4a10;
  }

  .ornament-bottom {
    text-align: center;
    color: #c9a84c;
    font-size: 1.1rem;
    letter-spacing: 0.4em;
    opacity: 0.5;
    margin-top: 28px;
  }

  .loading-screen {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    color: #8a6020;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
  }
`;

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'N/A';

  return (
    <div className="success-inner">
      <div className="success-card">

        {/* Medallion */}
        <div className="check-medallion">
          <div className="check-medallion-ring">
            <span className="check-icon">✦</span>
          </div>
        </div>

        <span className="tag-pill">Order Confirmed</span>

        <h1 className="serif-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2, marginBottom: '10px' }}>
          Order Placed Successfully
        </h1>

        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.9rem',
          fontWeight: 300,
          color: '#8a6020',
          letterSpacing: '0.04em',
          marginBottom: '4px',
        }}>
          Thank you for your purchase.
        </p>

        {/* Order ID */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="order-id-block">
            <span className="order-id-label">Order ID</span>
            <span className="order-id-value">{orderId}</span>
          </div>
        </div>

        <div className="ornament-divider"><div className="ornament-dot" /></div>

        {/* Info box */}
        <div className="info-box">
          <p>A confirmation email will be sent shortly with your order details and tracking information.</p>
          <p>Our team will process and dispatch your order within 2–3 business days.</p>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
          <Link href="/products" className="gold-btn">
            ✦ &nbsp;Continue Shopping
          </Link>
          <Link href="/" className="ghost-btn">
            Back to Home
          </Link>
        </div>

        <div className="ornament-bottom">✦ &nbsp; ✦ &nbsp; ✦</div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <style>{warmStyles}</style>
      <div className="success-wrap">
        <Header />

        <Suspense fallback={<div className="loading-screen">Loading your order...</div>}>
          <OrderSuccessContent />
        </Suspense>

        <Footer />
      </div>
    </>
  );
}