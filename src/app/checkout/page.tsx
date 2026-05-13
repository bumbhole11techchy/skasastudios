'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
}

const warmStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .checkout-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(150deg, #fdf8f0 0%, #fef5e4 50%, #fdf0dc 100%);
    font-family: 'Jost', sans-serif;
    position: relative;
  }

  .checkout-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .checkout-inner {
    flex: 1;
    max-width: 1080px;
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

  /* Form card */
  .form-card {
    background: linear-gradient(145deg, #fffdf8 0%, #fdf8ee 100%);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    padding: 36px 32px;
    box-shadow: 0 2px 12px #c9a84c0a, 0 8px 32px #c9a84c0c;
    position: relative;
  }
  .form-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, #c9a84c88, transparent);
    border-radius: 4px 0 0 4px;
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
  .warm-input::placeholder {
    color: #c4a882;
  }

  .warm-select {
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
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23c9a84c'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    cursor: pointer;
  }
  .warm-select:focus {
    border-color: #c9a84c;
    box-shadow: 0 0 0 3px #c9a84c18;
  }

  .field-group {
    display: grid;
    gap: 16px;
    margin-bottom: 20px;
  }
  .field-group-2 {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  .field-group-1 {
    grid-template-columns: 1fr;
  }

  .field-wrap {
    display: flex;
    flex-direction: column;
  }

  .section-subheader {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    font-weight: 500;
    color: #2c1a0e;
    letter-spacing: 0.06em;
    margin-bottom: 20px;
  }

  /* Payment button */
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
  .gold-btn:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px #c9a84c55;
  }
  .gold-btn:disabled {
    background: linear-gradient(135deg, #d4b87a, #bfa060);
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* Summary card */
  .summary-card {
    background: linear-gradient(145deg, #fffdf8 0%, #fdf8ee 100%);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    padding: 28px 26px;
    box-shadow: 0 2px 12px #c9a84c0a, 0 8px 28px #c9a84c08;
    position: relative;
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

  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 8px 0;
    border-bottom: 1px solid #e8d5a844;
  }
  .summary-item:last-of-type {
    border-bottom: none;
  }
  .summary-item-name {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: #5c3d1e;
    letter-spacing: 0.02em;
    flex: 1;
    margin-right: 12px;
  }
  .summary-item-qty {
    font-size: 0.72rem;
    color: #a0722a;
    letter-spacing: 0.06em;
  }
  .summary-item-price {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1rem;
    font-weight: 500;
    color: #2c1a0e;
    white-space: nowrap;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    font-weight: 300;
    color: #6b4a10;
    letter-spacing: 0.03em;
    padding: 5px 0;
  }
  .summary-total {
    display: flex;
    justify-content: space-between;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.4rem;
    font-weight: 500;
    color: #2c1a0e;
    letter-spacing: 0.04em;
    padding-top: 14px;
  }

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

  .security-note {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    padding: 10px 14px;
    background: #fffcf5;
    border: 1px solid #e8d5a866;
    border-radius: 2px;
    font-size: 0.72rem;
    color: #8a6020;
    letter-spacing: 0.04em;
    font-weight: 300;
  }
  .security-note::before {
    content: '🔒';
    font-size: 0.85rem;
  }

  .step-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #c9a84c, #a8832a);
    color: #fff8ec;
    font-size: 0.65rem;
    font-weight: 600;
    border-radius: 50%;
    margin-right: 8px;
    flex-shrink: 0;
  }
`;

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    const totalAmount = cart.reduce((sum: number, item: any) => sum + item.price * (item.quantity || 1), 0);
    setTotal(totalAmount);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
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
              } else {
                alert('Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              alert('Payment verification failed');
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
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
      <style dangerouslySetInnerHTML={{ __html: warmStyles }} />
      <div className="checkout-wrap">
        <Header />

        <div className="checkout-inner">

          {/* Page heading */}
          <div style={{ marginBottom: '8px' }}>
            <span className="tag-pill">✦ Secure Checkout</span>
            <h1 className="serif-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Complete Your Order
            </h1>
          </div>
          <div className="ornament-divider"><div className="ornament-dot" /></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

            {/* Shipping Form */}
            <div style={{ gridColumn: 'span 1' }}>
              <div className="form-card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="step-badge">1</span>
                  <h2 className="section-subheader" style={{ margin: 0 }}>Shipping Information</h2>
                </div>
                <div className="ornament-divider" style={{ margin: '12px 0 24px' }}>
                  <div className="ornament-dot" />
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

                  <div className="field-group field-group-2">
                    <div className="field-wrap">
                      <label className="gold-label">Full Name</label>
                      <input type="text" name="name" placeholder="Aanya Sharma" value={formData.name} onChange={handleChange} required className="warm-input" />
                    </div>
                    <div className="field-wrap">
                      <label className="gold-label">Email</label>
                      <input type="email" name="email" placeholder="aanya@example.com" value={formData.email} onChange={handleChange} required className="warm-input" />
                    </div>
                  </div>

                  <div className="field-group field-group-2" style={{ marginBottom: '20px' }}>
                    <div className="field-wrap">
                      <label className="gold-label">Phone Number</label>
                      <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required className="warm-input" />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', marginTop: '8px' }}>
                    <span className="step-badge">2</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem', color: '#2c1a0e', fontWeight: 500, letterSpacing: '0.06em' }}>Delivery Address</span>
                  </div>

                  <div className="field-group field-group-1" style={{ marginBottom: '20px' }}>
                    <div className="field-wrap">
                      <label className="gold-label">Street Address</label>
                      <input type="text" name="street" placeholder="12, Rose Lane, MG Road" value={formData.street} onChange={handleChange} required className="warm-input" />
                    </div>
                  </div>

                  <div className="field-group field-group-2">
                    <div className="field-wrap">
                      <label className="gold-label">City</label>
                      <input type="text" name="city" placeholder="Mumbai" value={formData.city} onChange={handleChange} required className="warm-input" />
                    </div>
                    <div className="field-wrap">
                      <label className="gold-label">State</label>
                      <input type="text" name="state" placeholder="Maharashtra" value={formData.state} onChange={handleChange} required className="warm-input" />
                    </div>
                  </div>

                  <div className="field-group field-group-2">
                    <div className="field-wrap">
                      <label className="gold-label">ZIP Code</label>
                      <input type="text" name="zipCode" placeholder="400 001" value={formData.zipCode} onChange={handleChange} required className="warm-input" />
                    </div>
                    <div className="field-wrap">
                      <label className="gold-label">Country</label>
                      <select name="country" value={formData.country} onChange={handleChange} className="warm-select">
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>

                  <div className="ornament-divider" style={{ margin: '12px 0' }}>
                    <div className="ornament-dot" />
                  </div>

                  <button type="submit" disabled={loading} className="gold-btn">
                    {loading ? 'Processing...' : '✦  Proceed to Payment'}
                  </button>

                  <div className="security-note">
                    Payments secured by Razorpay · 256-bit SSL encryption
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="summary-card" style={{ position: 'sticky', top: '1.5rem' }}>
              <span className="tag-pill">✦ Order Summary</span>
              <h2 className="serif-title" style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Your Selection</h2>
              <div className="ornament-divider" style={{ margin: '10px 0 18px' }}>
                <div className="ornament-dot" />
              </div>

              {/* Items */}
              <div style={{ marginBottom: '16px' }}>
                {cartItems.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div style={{ flex: 1, marginRight: '12px' }}>
                      <p className="summary-item-name">{item.name}</p>
                      <p className="summary-item-qty">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="summary-item-price">
                      ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ borderTop: '1px solid #e8d5a8', paddingTop: '14px' }}>
                <div className="summary-row">
                  <span>Subtotal</span>
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
                <div style={{ borderTop: '1px solid #e8d5a8', marginTop: '10px' }}>
                  <div className="summary-total">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <p style={{
                marginTop: '18px',
                textAlign: 'center',
                fontSize: '0.7rem',
                color: '#b09060',
                letterSpacing: '0.08em',
                fontWeight: 300,
                fontStyle: 'italic',
              }}>
                Every piece arrives in our signature gift box
              </p>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}