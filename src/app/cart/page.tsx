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

/* ─── design tokens ───────────────────────────────────── */
const C = {
  sageHint:  '#BFCFBB',
  mint:      '#C8D8C4',
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

/* ─── style objects ───────────────────────────────────── */
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
    maxWidth: '1100px',
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

  /* Cart item card */
  itemCard: {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: '4px',
    padding: '18px 20px',
    display: 'flex',
    gap: '18px',
    alignItems: 'flex-start',
    boxShadow: `0 2px 12px rgba(52,76,61,0.05), 0 8px 28px rgba(52,76,61,0.04)`,
    transition: 'box-shadow 0.2s, transform 0.2s',
    position: 'relative' as const,
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  itemImg: {
    width: '88px',
    height: '88px',
    objectFit: 'cover' as const,
    borderRadius: '2px',
    border: `1px solid ${C.borderSoft}`,
    flexShrink: 0,
  } as React.CSSProperties,

  itemName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.15rem',
    fontWeight: 500,
    color: C.evergreen,
    letterSpacing: '0.02em',
    lineHeight: 1.3,
    margin: 0,
  } as React.CSSProperties,

  itemPrice: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 500,
    color: C.moss,
    letterSpacing: '0.06em',
    marginTop: '4px',
  } as React.CSSProperties,

  goldLabel: {
    fontSize: '0.66rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: C.moss,
    marginRight: '4px',
  } as React.CSSProperties,

  qtyBtn: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.8)',
    border: `1px solid rgba(115,138,110,0.38)`,
    borderRadius: '2px',
    color: C.evergreen,
    fontSize: '1rem',
    cursor: 'pointer',
    lineHeight: 1,
    transition: 'background 0.15s',
  } as React.CSSProperties,

  qtyDisplay: {
    minWidth: '32px',
    textAlign: 'center' as const,
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 500,
    color: C.textDark,
    background: 'rgba(255,255,255,0.8)',
    border: `1px solid ${C.borderSoft}`,
    borderRadius: '2px',
    padding: '3px 8px',
  } as React.CSSProperties,

  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: C.sage,
    fontSize: '1rem',
    padding: '4px',
    transition: 'color 0.2s',
    lineHeight: 1,
    flexShrink: 0,
  } as React.CSSProperties,

  subtotalText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.05rem',
    color: C.evergreen,
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,

  continueLink: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.72rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    color: C.moss,
    textDecoration: 'none',
    borderBottom: `1px solid rgba(115,138,110,0.4)`,
    paddingBottom: '2px',
  } as React.CSSProperties,

  /* Summary card */
  summaryCard: {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: '4px',
    padding: '28px 26px',
    boxShadow: `0 2px 12px rgba(52,76,61,0.05), 0 8px 28px rgba(52,76,61,0.04)`,
    position: 'sticky' as const,
    top: '1.5rem',
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  summaryH2: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.5rem',
    fontWeight: 400,
    letterSpacing: '0.04em',
    color: C.evergreen,
    marginBottom: '6px',
  } as React.CSSProperties,

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 300,
    color: C.textMid,
    letterSpacing: '0.03em',
    padding: '6px 0',
  } as React.CSSProperties,

  summaryTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.25rem',
    fontWeight: 500,
    color: C.evergreen,
    letterSpacing: '0.04em',
    paddingTop: '12px',
  } as React.CSSProperties,

  checkoutBtn: {
    display: 'block',
    width: '100%',
    textAlign: 'center' as const,
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
    textDecoration: 'none',
  } as React.CSSProperties,

  freeBadge: {
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    color: C.moss,
    background: 'rgba(191,207,187,0.3)',
    border: `1px solid rgba(115,138,110,0.3)`,
    padding: '2px 10px',
    borderRadius: '2px',
    fontWeight: 500,
  } as React.CSSProperties,

  secureNote: {
    marginTop: '14px',
    textAlign: 'center' as const,
    fontSize: '0.7rem',
    color: C.textLight,
    letterSpacing: '0.06em',
    fontWeight: 300,
  } as React.CSSProperties,

  /* Empty state */
  emptyTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.6rem',
    fontWeight: 300,
    color: C.sage,
    fontStyle: 'italic',
    marginBottom: '8px',
  } as React.CSSProperties,

  emptySubtitle: {
    fontSize: '0.82rem',
    color: C.textLight,
    letterSpacing: '0.04em',
    fontWeight: 300,
    marginBottom: '28px',
  } as React.CSSProperties,

  exploreBtn: {
    display: 'inline-block',
    background: C.evergreen,
    color: C.sageHint,
    borderRadius: '2px',
    padding: '13px 32px',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.74rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    transition: 'background 0.2s',
  } as React.CSSProperties,

  /* Loading */
  loadingScreen: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' as const,
    background: C.bg,
    fontFamily: "'Jost', sans-serif",
    gap: '16px',
  } as React.CSSProperties,

  loadingText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.1rem',
    color: C.evergreen,
    fontStyle: 'italic',
  } as React.CSSProperties,
};

/* ─── sub-components ──────────────────────────────────── */
function Divider({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ ...S.dividerWrap, ...style }}>
      <div style={S.dividerLine} />
      <div style={S.diamond} />
      <div style={S.dividerLine} />
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div style={{
      width: '28px', height: '28px',
      border: `2px solid ${C.sageHint}`,
      borderTopColor: C.moss,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  );
}

/* ─── page ────────────────────────────────────────────── */
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  }, []);

  const removeFromCart = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const updateQuantity = (index: number, quantity: number) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, quantity);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  /* Spinner keyframe — tiny, safe, no hydration risk */
  const spinKeyframe = (
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  );

  if (loading) {
    return (
      <>
        {spinKeyframe}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <div style={S.loadingScreen}>
          <LoadingSpinner />
          <p style={S.loadingText}>Loading your selections&hellip;</p>
        </div>
      </>
    );
  }

  return (
    <>
      {spinKeyframe}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div style={S.page}>
        <Header />

        <div style={S.inner}>

          {/* Page title */}
          <div style={{ marginBottom: '8px' }}>
            <span style={S.tagPill}>✦ Your Selections</span>
            <h1 style={S.h1}>Shopping Cart</h1>
          </div>
          <Divider />

          {cartItems.length === 0 ? (
            /* ── Empty state ── */
            <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
              <p style={S.emptyTitle}>Your cart is empty</p>
              <p style={S.emptySubtitle}>Discover our curated collection of fine jewellery</p>
              <Divider style={{ maxWidth: '200px', margin: '0 auto 28px' }} />
              <Link href="/products" style={S.exploreBtn}>
                Explore Collection
              </Link>
            </div>

          ) : (
            /* ── Filled cart ── */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'start',
            }}>

              {/* Cart items — spans 2 cols */}
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {cartItems.map((item, index) => (
                    <div key={index} style={S.itemCard}>

                      {/* Sage left accent bar */}
                      <div style={{
                        position: 'absolute',
                        left: 0, top: 0, bottom: 0,
                        width: '2px',
                        background: `linear-gradient(180deg, transparent, ${C.sage}, transparent)`,
                        borderRadius: '4px 0 0 4px',
                        opacity: 0.6,
                      }} />

                      <img src={item.image} alt={item.name} style={S.itemImg} />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={S.itemName}>{item.name}</p>
                        <p style={S.itemPrice}>₹{item.price.toLocaleString('en-IN')}</p>

                        {/* Qty controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                          <span style={S.goldLabel}>Qty</span>
                          <button style={S.qtyBtn} onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}>−</button>
                          <span style={S.qtyDisplay}>{item.quantity || 1}</span>
                          <button style={S.qtyBtn} onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>+</button>
                        </div>
                      </div>

                      {/* Subtotal + remove */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                        <p style={S.subtotalText}>
                          ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                        </p>
                        <button style={S.removeBtn} onClick={() => removeFromCart(index)} title="Remove item">
                          ✕
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Continue shopping */}
                <div style={{ marginTop: '20px' }}>
                  <Link href="/products" style={S.continueLink}>
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order summary */}
              <div style={S.summaryCard}>
                <span style={S.tagPill}>✦ Order Summary</span>
                <h2 style={S.summaryH2}>Your Order</h2>
                <Divider style={{ margin: '10px 0 16px' }} />

                <div style={{ marginBottom: '16px' }}>
                  <div style={S.summaryRow}>
                    <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={S.summaryRow}>
                    <span>Shipping</span>
                    <span style={S.freeBadge}>Free</span>
                  </div>
                  <div style={{ ...S.summaryRow, fontStyle: 'italic', color: C.sage, fontSize: '0.78rem' }}>
                    <span>Complimentary gift wrap</span>
                    <span>✦</span>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '14px', marginBottom: '22px' }}>
                  <div style={S.summaryTotalRow}>
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link href="/checkout" style={S.checkoutBtn}>
                  Proceed to Checkout
                </Link>

                <p style={S.secureNote}>Secure checkout · Free returns</p>
              </div>

            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}