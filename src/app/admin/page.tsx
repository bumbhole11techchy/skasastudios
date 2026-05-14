'use client';

import { FormEvent, useEffect, useState } from 'react';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  stock: string;
  sku: string;
}

const initialForm: ProductForm = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  category: 'Rings',
  stock: '0',
  sku: '',
};

const PRODUCT_CATEGORIES = [
  'Rings',
  'Necklaces',
  'Bracelets',
  'Earrings',
  'Anklets',
  'Pendants',
  'Brooches',
  'Custom Collections',
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .admin-wrap {
    min-height: 100vh;
    background: linear-gradient(150deg, #f4f7f3 0%, #edf2eb 50%, #e6ede4 100%);
    font-family: 'Jost', sans-serif;
    position: relative;
  }

  .admin-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .admin-card {
    position: relative;
    z-index: 1;
    background: linear-gradient(145deg, rgba(255,255,255,0.78) 0%, rgba(237,242,235,0.65) 100%);
    border: 1px solid rgba(142,165,140,0.4);
    border-radius: 4px;
    box-shadow:
      0 2px 12px rgba(52,76,61,0.05),
      0 8px 32px rgba(52,76,61,0.06),
      inset 0 1px 0 rgba(255,255,255,0.8);
    backdrop-filter: blur(4px);
  }

  .admin-card::before {
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

  .sage-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #738A6E;
  }

  .sage-input {
    width: 100%;
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(115,138,110,0.35);
    border-radius: 2px;
    padding: 10px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: #1e3028;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    margin-top: 6px;
    box-sizing: border-box;
  }

  .sage-input:focus {
    border-color: #738A6E;
    box-shadow: 0 0 0 3px rgba(115,138,110,0.12);
    background: #ffffff;
  }

  .sage-input::placeholder {
    color: #a8c0a4;
  }

  .sage-select {
    width: 100%;
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(115,138,110,0.35);
    border-radius: 2px;
    padding: 10px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: #1e3028;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    margin-top: 6px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23738A6E' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
    box-sizing: border-box;
  }

  .sage-select:focus {
    border-color: #738A6E;
    box-shadow: 0 0 0 3px rgba(115,138,110,0.12);
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23738A6E' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  .sage-select option {
    background: #ffffff;
    color: #1e3028;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    padding: 8px;
  }

  .sage-textarea {
    resize: none;
    height: 100px;
  }

  .primary-btn {
    width: 100%;
    background: #344C3D;
    color: #BFCFBB;
    border: none;
    border-radius: 2px;
    padding: 14px 20px;
    font-family: 'Jost', sans-serif;
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 16px rgba(52,76,61,0.2);
  }

  .primary-btn:hover {
    background: #2a3d31;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(52,76,61,0.28);
  }

  .ghost-btn {
    background: transparent;
    border: 1px solid rgba(115,138,110,0.5);
    color: #738A6E;
    border-radius: 2px;
    padding: 9px 20px;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .ghost-btn:hover {
    background: rgba(115,138,110,0.1);
    color: #344C3D;
    border-color: rgba(115,138,110,0.7);
  }

  .ornament-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0 20px;
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

  .status-bar {
    background: linear-gradient(90deg, rgba(237,242,235,0.7), rgba(244,247,243,0.5));
    border: 1px solid rgba(142,165,140,0.3);
    border-radius: 2px;
    padding: 10px 16px;
    font-size: 0.82rem;
    font-weight: 400;
    color: #344C3D;
    letter-spacing: 0.03em;
    position: relative;
  }

  .status-bar::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, rgba(142,165,140,0.6), transparent);
    border-radius: 2px 0 0 2px;
  }

  .file-input-wrap {
    margin-top: 6px;
    position: relative;
  }

  .file-input-wrap input[type="file"] {
    width: 100%;
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    color: #4a6552;
    background: rgba(255,255,255,0.85);
    border: 1px dashed rgba(115,138,110,0.5);
    border-radius: 2px;
    padding: 10px 14px;
    cursor: pointer;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  .file-input-wrap input[type="file"]:hover {
    border-color: #738A6E;
  }

  .file-input-wrap input[type="file"]::file-selector-button {
    background: #344C3D;
    color: #BFCFBB;
    border: none;
    border-radius: 2px;
    padding: 5px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    margin-right: 10px;
  }

  .tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #738A6E;
    border: 1px solid rgba(115,138,110,0.38);
    padding: 3px 12px;
    border-radius: 2px;
    background: rgba(191,207,187,0.2);
  }

  .loading-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(150deg, #f4f7f3 0%, #edf2eb 50%, #e6ede4 100%);
    font-family: 'Jost', sans-serif;
  }

  .loading-card {
    background: linear-gradient(145deg, rgba(255,255,255,0.78), rgba(237,242,235,0.65));
    border: 1px solid rgba(142,165,140,0.4);
    border-radius: 4px;
    padding: 36px 48px;
    box-shadow: 0 8px 40px rgba(52,76,61,0.08);
    text-align: center;
    backdrop-filter: blur(4px);
  }

  .loading-spinner {
    width: 28px;
    height: 28px;
    border: 2px solid rgba(142,165,140,0.3);
    border-top-color: #738A6E;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState<ProductForm>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function verify() {
      try {
        const response = await fetch('/api/admin/verify');
        if (response.ok) setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('Verifying credentials...');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: loginPassword }),
    });

    if (response.ok) {
      setIsLoggedIn(true);
      setStatusMessage('Admin access granted. You may add products now.');
      setLoginPassword('');
    } else {
      setStatusMessage('Invalid admin password.');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsLoggedIn(false);
    setFormData(initialForm);
    setSelectedFile(null);
    setStatusMessage('Logged out successfully.');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('Uploading product...');

    if (!selectedFile) {
      setStatusMessage('Please select an image file.');
      return;
    }

    const imageData = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('Unable to read image file');
      reader.readAsDataURL(selectedFile);
    });

    if (!imageData || typeof imageData !== 'string') {
      setStatusMessage('Image upload failed.');
      return;
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: formData.price,
        originalPrice: formData.originalPrice,
        stock: formData.stock,
        imageData,
      }),
    });

    if (response.ok) {
      setStatusMessage('Product uploaded successfully.');
      setFormData(initialForm);
      setSelectedFile(null);
    } else {
      const error = await response.json();
      setStatusMessage(error?.error || 'Unable to upload product.');
    }
  };

  if (loading) {
    return (
      <>
        <style suppressHydrationWarning>{styles}</style>
        <div className="loading-screen">
          <div className="loading-card">
            <div className="loading-spinner" />
            <p className="serif-title" style={{ fontSize: '1.1rem' }}>Verifying access...</p>
          </div>
        </div>
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <style suppressHydrationWarning>{styles}</style>
        <div className="admin-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '420px', padding: '48px 40px' }}>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#738A6E', marginBottom: '10px' }}>
                ✦ &nbsp; Skasastudios &nbsp; ✦
              </p>
              <h1 className="serif-title" style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
                Admin Portal
              </h1>
              <div className="ornament-divider" style={{ marginTop: '16px' }}>
                <div className="ornament-dot" />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#4a6552', letterSpacing: '0.04em', fontWeight: 300 }}>
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <label className="block" style={{ marginBottom: '20px' }}>
                <span className="sage-label">Admin Password</span>
                <input
                  id="adminPassword"
                  type="password"
                  className="sage-input"
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  required
                />
              </label>
              <button type="submit" className="primary-btn">
                Sign In
              </button>
            </form>

            {statusMessage && (
              <div className="status-bar" style={{ marginTop: '16px' }}>
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style suppressHydrationWarning>{styles}</style>
      <div className="admin-wrap" style={{ padding: '2.5rem 1.5rem' }}>
        <div className="admin-card" style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 44px' }}>

          {/* Page Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span className="tag-pill">✦ Product Management</span>
                  <span className="tag-pill">Cloudinary · MongoDB</span>
                </div>
                <h1 className="serif-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.15 }}>
                  Upload New Product
                </h1>
                <p style={{ marginTop: '8px', fontSize: '0.82rem', color: '#4a6552', fontWeight: 300, letterSpacing: '0.02em' }}>
                  Add product details and upload images — stored via Cloudinary &amp; MongoDB.
                </p>
              </div>
              <button type="button" onClick={handleLogout} className="ghost-btn">
                Sign Out
              </button>
            </div>
            <div className="ornament-divider">
              <div className="ornament-dot" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>

            {/* Name + SKU */}
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label className="block">
                <span className="sage-label">Product Name</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="sage-input"
                  required
                />
              </label>
              <label className="block">
                <span className="sage-label">SKU</span>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="sage-input"
                  required
                />
              </label>
            </div>

            {/* Description */}
            <label className="block">
              <span className="sage-label">Description</span>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="sage-input sage-textarea"
                required
              />
            </label>

            {/* Price + Original Price + Stock */}
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              <label className="block">
                <span className="sage-label">Price</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="sage-input"
                  required
                />
              </label>
              <label className="block">
                <span className="sage-label">Original Price</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="sage-input"
                />
              </label>
              <label className="block">
                <span className="sage-label">Stock</span>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="sage-input"
                />
              </label>
            </div>

            {/* Category + Image */}
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label className="block">
                <span className="sage-label">Category</span>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="sage-select"
                  required
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="sage-label">Product Image</span>
                <div className="file-input-wrap">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>
              </label>
            </div>

            {/* Divider before submit */}
            <div className="ornament-divider" style={{ margin: '4px 0' }}>
              <div className="ornament-dot" />
            </div>

            <button type="submit" className="primary-btn">
              ✦ &nbsp; Upload Product
            </button>

            {statusMessage && (
              <div className="status-bar">
                {statusMessage}
              </div>
            )}

          </form>
        </div>
      </div>
    </>
  );
}