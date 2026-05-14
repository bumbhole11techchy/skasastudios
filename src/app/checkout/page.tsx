'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

declare global {
  interface Window { Razorpay: any; }
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
}

/* ─── tokens ──────────────────────────────────────────── */
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
    maxWidth: '1080px',
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

  /* Form card */
  formCard: {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: '4px',
    padding: '36px 32px',
    boxShadow: `0 2px 12px rgba(52,76,61,0.05), 0 8px 32px rgba(52,76,61,0.06)`,
    position: 'relative' as const,
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  formCardBar: {
    position: 'absolute' as const,
    left: 0, top: 0, bottom: 0,
    width: '2px',
    background: `linear-gradient(180deg, transparent, ${C.sage}, transparent)`,
    borderRadius: '4px 0 0 4px',
    opacity: 0.7,
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

  select: {
    width: '100%',
    background: 'rgba(255,255,255,0.85)',
    border: `1px solid rgba(115,138,110,0.35)`,
    borderRadius: '2px',
    padding: '10px 36px 10px 14px',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 300,
    color: C.textDark,
    outline: 'none',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23738A6E'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    cursor: 'pointer',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,

  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  } as React.CSSProperties,

  grid1: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    marginBottom: '20px',
  } as React.CSSProperties,

  fieldWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,

  stepBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    background: C.evergreen,
    color: C.sageHint,
    fontSize: '0.65rem',
    fontWeight: 600,
    borderRadius: '50%',
    marginRight: '8px',
    flexShrink: 0,
  } as React.CSSProperties,

  sectionSubH: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.3rem',
    fontWeight: 500,
    color: C.evergreen,
    letterSpacing: '0.06em',
    margin: 0,
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

  submitBtnDisabled: {
    background: C.moss,
    cursor: 'not-allowed',
    opacity: 0.65,
  } as React.CSSProperties,

  securityNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '14px',
    padding: '10px 14px',
    background: 'rgba(191,207,187,0.18)',
    border: `1px solid ${C.borderSoft}`,
    borderRadius: '2px',
    fontSize: '0.72rem',
    color: C.moss,
    letterSpacing: '0.04em',
    fontWeight: 300,
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

  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '8px 0',
    borderBottom: `1px solid rgba(142,165,140,0.2)`,
  } as React.CSSProperties,

  summaryItemName: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 300,
    color: C.textMid,
    letterSpacing: '0.02em',
    margin: 0,
  } as React.CSSProperties,

  summaryItemQty: {
    fontSize: '0.72rem',
    color: C.sage,
    letterSpacing: '0.06em',
  } as React.CSSProperties,

  summaryItemPrice: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1rem',
    fontWeight: 500,
    color: C.evergreen,
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 300,
    color: C.textMid,
    letterSpacing: '0.03em',
    padding: '5px 0',
  } as React.CSSProperties,

  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.4rem',
    fontWeight: 500,
    color: C.evergreen,
    letterSpacing: '0.04em',
    paddingTop: '14px',
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

  giftNote: {
    marginTop: '18px',
    textAlign: 'center' as const,
    fontSize: '0.7rem',
    color: C.textLight,
    letterSpacing: '0.08em',
    fontWeight: 300,
    fontStyle: 'italic',
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

function Field({
  label, name, type = 'text', placeholder, value, onChange, required = false,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div style={S.fieldWrap}>
      <label style={S.fieldLabel}>{label}</label>
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
export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    street: '', city: '', state: '', zipCode: '', country: 'India',
  });
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setTotal(cart.reduce((sum: number, item: any) => sum + item.price * (item.quantity || 1), 0));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: {
            street: formData.street, city: formData.city,
            state: formData.state, zipCode: formData.zipCode, country: formData.country,
          },
          totalAmount: total,
        }),
      });
      if (!orderResponse.ok) throw new Error('Failed to create order');
      const orderData = await orderResponse.json();

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const options = {
          key: orderData.key,
          amount: orderData.amount * 100,
          currency: orderData.currency,
          order_id: orderData.razorpayOrderId,
          handler: async (response: any) => {
            try {
              const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });
              if (verifyResponse.ok) {
                localStorage.removeItem('cart');
                router.push(`/order-success?orderId=${orderData.orderId}`);
              } else { alert('Payment verification failed'); }
            } catch { alert('Payment verification failed'); }
          },
          prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process checkout');
    } finally {
      setLoading(false);
    }
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
            <span style={S.tagPill}>✦ Secure Checkout</span>
            <h1 style={S.h1}>Complete Your Order</h1>
          </div>
          <Divider />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

            {/* ── Shipping form ── */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={S.formCard}>
                <div style={S.formCardBar} />

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={S.stepBadge}>1</span>
                  <h2 style={S.sectionSubH}>Shipping Information</h2>
                </div>
                <Divider style={{ margin: '12px 0 24px' }} />

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                  <div style={S.grid2}>
                    <Field label="Full Name"     name="name"  placeholder="Aanya Sharma"        value={formData.name}  onChange={handleChange} required />
                    <Field label="Email"          name="email" type="email" placeholder="aanya@example.com" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div style={S.grid2}>
                    <Field label="Phone Number"  name="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required />
                  </div>

                  {/* Step 2 */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', marginTop: '8px' }}>
                    <span style={S.stepBadge}>2</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem', color: C.evergreen, fontWeight: 500, letterSpacing: '0.06em' }}>
                      Delivery Address
                    </span>
                  </div>

                  <div style={S.grid1}>
                    <Field label="Street Address" name="street" placeholder="12, Rose Lane, MG Road" value={formData.street} onChange={handleChange} required />
                  </div>

                  <div style={S.grid2}>
                    <Field label="City"  name="city"  placeholder="Mumbai"      value={formData.city}  onChange={handleChange} required />
                    <Field label="State" name="state" placeholder="Maharashtra" value={formData.state} onChange={handleChange} required />
                  </div>

                  <div style={S.grid2}>
                    <Field label="ZIP Code" name="zipCode" placeholder="400 001" value={formData.zipCode} onChange={handleChange} required />
                    <div style={S.fieldWrap}>
                      <label style={S.fieldLabel}>Country</label>
                      <select name="country" value={formData.country} onChange={handleChange} style={S.select}>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>

                  <Divider style={{ margin: '12px 0' }} />

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ ...S.submitBtn, ...(loading ? S.submitBtnDisabled : {}) }}
                  >
                    {loading ? 'Processing…' : '✦  Proceed to Payment'}
                  </button>

                  <div style={S.securityNote}>
                    <span>🔒</span>
                    Payments secured by Razorpay · 256-bit SSL encryption
                  </div>

                </form>
              </div>
            </div>

            {/* ── Order summary ── */}
            <div style={S.summaryCard}>
              <span style={S.tagPill}>✦ Order Summary</span>
              <h2 style={S.summaryH2}>Your Selection</h2>
              <Divider style={{ margin: '10px 0 18px' }} />

              <div style={{ marginBottom: '16px' }}>
                {cartItems.map((item, index) => (
                  <div key={index} style={S.summaryItem}>
                    <div style={{ flex: 1, marginRight: '12px' }}>
                      <p style={S.summaryItemName}>{item.name}</p>
                      <p style={S.summaryItemQty}>Qty: {item.quantity || 1}</p>
                    </div>
                    <span style={S.summaryItemPrice}>
                      ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '14px' }}>
                <div style={S.summaryRow}>
                  <span>Subtotal</span>
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
                <div style={{ borderTop: `1px solid ${C.border}`, marginTop: '10px' }}>
                  <div style={S.summaryTotal}>
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <p style={S.giftNote}>Every piece arrives in our signature gift box</p>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}