'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .success-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(150deg, #f4f7f3 0%, #edf2eb 50%, #e6ede4 100%);
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
    background: linear-gradient(145deg, rgba(255,255,255,0.78) 0%, rgba(237,242,235,0.65) 100%);
    border: 1px solid rgba(142,165,140,0.4);
    border-radius: 4px;
    padding: 52px 48px;
    max-width: 560px;
    width: 100%;
    text-align: center;
    box-shadow:
      0 2px 12px rgba(52,76,61,0.05),
      0 8px 32px rgba(52,76,61,0.06),
      inset 0 1px 0 rgba(255,255,255,0.8);
    position: relative;
    backdrop-filter: blur(4px);
  }

  .success-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 4px;
    background: linear-gradient(135deg, rgba(142,165,140,0.2), transparent 40%, transparent 60%, rgba(115,138,110,0.12));
    pointer-events: none;
    z-index: -1;
  }

  .serif-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #344C3D;
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
    background: linear-gradient(90deg, transparent, rgba(142,165,140,0.5), transparent);
  }
  .ornament-dot {
    width: 5px;
    height: 5px;
    background: #738A6E;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .tag-pill {
    display: inline-flex;
    align-items: center;
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #738A6E;
    border: 1px solid rgba(115,138,110,0.38);
    padding: 3px 12px;
    border-radius: 2px;
    background: rgba(191,207,187,0.2);
    margin-bottom: 20px;
  }

  /* Sage medallion */
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
    background: linear-gradient(135deg, #e8efe6, #dce8d9);
    border: 2px solid rgba(142,165,140,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(115,138,110,0.18), inset 0 1px 0 rgba(255,255,255,0.7);
    position: relative;
  }
  .check-medallion-ring::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    border: 1px solid rgba(115,138,110,0.25);
  }
  .check-icon {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2rem;
    color: #738A6E;
    line-height: 1;
  }

  /* Order ID block */
  .order-id-block {
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(142,165,140,0.4);
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
    color: #8EA58C;
    font-weight: 600;
  }
  .order-id-value {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.15rem;
    font-weight: 500;
    color: #1e3028;
    letter-spacing: 0.06em;
  }

  /* Info box */
  .info-box {
    background: linear-gradient(90deg, rgba(237,242,235,0.7), rgba(244,247,243,0.5));
    border: 1px solid rgba(142,165,140,0.3);
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
    background: linear-gradient(180deg, transparent, rgba(142,165,140,0.6), transparent);
    border-radius: 2px 0 0 2px;
  }
  .info-box p {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: #4a6552;
    line-height: 1.7;
    letter-spacing: 0.02em;
    margin: 0 0 8px;
  }
  .info-box p:last-child { margin: 0; }

  /* Primary button */
  .primary-btn {
    display: inline-block;
    background: #344C3D;
    color: #BFCFBB;
    border: none;
    border-radius: 2px;
    padding: 13px 28px;
    font-family: 'Jost', sans-serif;
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 16px rgba(52,76,61,0.2);
  }
  .primary-btn:hover {
    background: #2a3d31;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(52,76,61,0.28);
  }

  /* Ghost button */
  .ghost-btn {
    display: inline-block;
    background: transparent;
    border: 1px solid rgba(115,138,110,0.5);
    color: #738A6E;
    border-radius: 2px;
    padding: 12px 28px;
    font-family: 'Jost', sans-serif;
    font-size: 0.74rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .ghost-btn:hover {
    background: rgba(115,138,110,0.1);
    color: #344C3D;
    border-color: rgba(115,138,110,0.7);
  }

  .ornament-bottom {
    text-align: center;
    color: #8EA58C;
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
    color: #738A6E;
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

        <span className="tag-pill">✦ Order Confirmed</span>

        <h1 className="serif-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2, marginBottom: '10px' }}>
          Order Placed Successfully
        </h1>

        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.9rem',
          fontWeight: 300,
          color: '#7a9a82',
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
          <Link href="/products" className="primary-btn">
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
      <style>{styles}</style>
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