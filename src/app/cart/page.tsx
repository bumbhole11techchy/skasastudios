'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

const warmStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .cart-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(150deg, #fdf8f0 0%, #fef5e4 50%, #fdf0dc 100%);
    font-family: 'Jost', sans-serif;
    position: relative;
  }

  .cart-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .cart-inner {
    flex: 1;
    max-width: 1100px;
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

  /* Cart item card */
  .cart-item-card {
    background: linear-gradient(145deg, #fffdf8 0%, #fdf8ee 100%);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    padding: 18px 20px;
    display: flex;
    gap: 18px;
    align-items: flex-start;
    box-shadow: 0 2px 12px #c9a84c0a, 0 8px 28px #c9a84c08;
    transition: box-shadow 0.2s, transform 0.2s;
    position: relative;
  }
  .cart-item-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, #c9a84c88, transparent);
    border-radius: 4px 0 0 4px;
  }
  .cart-item-card:hover {
    box-shadow: 0 4px 20px #c9a84c14, 0 12px 40px #c9a84c0c;
    transform: translateY(-1px);
  }

  .cart-item-img {
    width: 88px;
    height: 88px;
    object-fit: cover;
    border-radius: 2px;
    border: 1px solid #e8d5a866;
    flex-shrink: 0;
  }

  .item-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.15rem;
    font-weight: 500;
    color: #2c1a0e;
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  .item-price {
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #a0722a;
    letter-spacing: 0.06em;
    margin-top: 4px;
  }

  .qty-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fffcf5;
    border: 1px solid #ddc87a88;
    border-radius: 2px;
    color: #8a6020;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    line-height: 1;
  }
  .qty-btn:hover {
    background: #fef3d4;
    border-color: #c9a84c;
  }

  .qty-display {
    min-width: 32px;
    text-align: center;
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: #3a2410;
    background: #fffcf5;
    border: 1px solid #ddc87a55;
    border-radius: 2px;
    padding: 3px 8px;
  }

  .remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #c9a84c88;
    font-size: 1.1rem;
    padding: 4px;
    transition: color 0.2s;
    line-height: 1;
    flex-shrink: 0;
  }
  .remove-btn:hover {
    color: #9b3a1a;
  }

  /* Summary card */
  .summary-card {
    background: linear-gradient(145deg, #fffdf8 0%, #fdf8ee 100%);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    padding: 28px 26px;
    box-shadow: 0 2px 12px #c9a84c0a, 0 8px 28px #c9a84c08;
    position: sticky;
    top: 1.5rem;
  }
  .summary-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 4px;
    background: linear-gradient(135deg, #d4a84b22, transparent 40%, transparent 60%, #d4a84b18);
    pointer-events: none;
    z-index: -1;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: #6b4a10;
    letter-spacing: 0.03em;
    padding: 6px 0;
  }

  .summary-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 500;
    color: #2c1a0e;
    letter-spacing: 0.04em;
    padding-top: 12px;
  }

  .gold-label {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8a6020;
  }

  .checkout-btn {
    display: block;
    width: 100%;
    text-align: center;
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
    text-decoration: none;
  }
  .checkout-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px #c9a84c55;
  }

  .continue-btn {
    display: inline-block;
    background: linear-gradient(135deg, #c9a84c 0%, #a8832a 100%);
    color: #fff8ec;
    border-radius: 2px;
    padding: 13px 32px;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 16px #c9a84c44;
  }
  .continue-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
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

  .loading-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: linear-gradient(150deg, #fdf8f0, #fef5e4, #fdf0dc);
    font-family: 'Jost', sans-serif;
    gap: 16px;
  }
  .loading-spinner {
    width: 28px;
    height: 28px;
    border: 2px solid #e8d5a8;
    border-top-color: #c9a84c;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .free-badge {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: #7a9a5a;
    background: #f0f7eb;
    border: 1px solid #b8d8a055;
    padding: 2px 10px;
    border-radius: 2px;
    font-weight: 500;
  }
`;

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  }, []);

  const removeFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (index: number, quantity: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, quantity);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  if (loading) {
    return (
      <>
        <style>{warmStyles}</style>
        <div className="loading-screen">
          <Header />
          <div className="loading-spinner" />
          <p className="serif-title" style={{ fontSize: '1.1rem' }}>Loading your selections...</p>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{warmStyles}</style>
      <div className="cart-wrap">
        <Header />

        <div className="cart-inner">

          {/* Page title */}
          <div style={{ marginBottom: '8px' }}>
            <span className="tag-pill">✦ Your Selections</span>
            <h1 className="serif-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Shopping Cart
            </h1>
          </div>
          <div className="ornament-divider"><div className="ornament-dot" /></div>

          {cartItems.length === 0 ? (
            /* Empty state */
            <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.6rem',
                fontWeight: 300,
                color: '#8a6020',
                fontStyle: 'italic',
                marginBottom: '8px',
              }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '0.82rem', color: '#b09060', letterSpacing: '0.04em', fontWeight: 300, marginBottom: '28px' }}>
                Discover our curated collection of fine jewelry
              </p>
              <div className="ornament-divider" style={{ maxWidth: '200px', margin: '0 auto 28px' }}>
                <div className="ornament-dot" />
              </div>
              <Link href="/products" className="continue-btn">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

              {/* Cart Items — 2/3 width on large screens */}
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {cartItems.map((item, index) => (
                    <div key={index} className="cart-item-card">
                      <img src={item.image} alt={item.name} className="cart-item-img" />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>

                        {/* Qty controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                          <span className="gold-label" style={{ marginRight: '4px' }}>Qty</span>
                          <button className="qty-btn" onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}>−</button>
                          <span className="qty-display">{item.quantity || 1}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>+</button>
                        </div>
                      </div>

                      {/* Subtotal + remove */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                        <p style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: '1.05rem',
                          color: '#2c1a0e',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                        }}>
                          ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                        </p>
                        <button className="remove-btn" onClick={() => removeFromCart(index)} title="Remove item">
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue shopping link */}
                <div style={{ marginTop: '20px' }}>
                  <Link href="/products" style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.72rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#a0722a',
                    textDecoration: 'none',
                    borderBottom: '1px solid #c9a84c55',
                    paddingBottom: '2px',
                    transition: 'color 0.2s',
                  }}>
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="summary-card" style={{ position: 'relative' }}>
                <p className="tag-pill" style={{ marginBottom: '14px' }}>✦ Order Summary</p>
                <h2 className="serif-title" style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
                  Your Order
                </h2>
                <div className="ornament-divider" style={{ margin: '10px 0 16px' }}>
                  <div className="ornament-dot" />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div className="summary-row">
                    <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span className="free-badge">Free</span>
                  </div>
                  <div className="summary-row" style={{ fontStyle: 'italic', color: '#a0722a', fontSize: '0.78rem' }}>
                    <span>Complimentary gift wrap</span>
                    <span>✦</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e8d5a8', paddingTop: '14px', marginBottom: '22px' }}>
                  <div className="summary-total-row">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link href="/checkout" className="checkout-btn">
                  Proceed to Checkout
                </Link>

                <p style={{
                  marginTop: '14px',
                  textAlign: 'center',
                  fontSize: '0.7rem',
                  color: '#b09060',
                  letterSpacing: '0.06em',
                  fontWeight: 300,
                }}>
                  Secure checkout · Free returns
                </p>
              </div>

            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}